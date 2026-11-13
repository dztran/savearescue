/**
 * Class to do database related stuff
*/
import { Platform} from 'react-native';
import { showMessage } from 'react-native-messages';
const RNFS = require('@dr.pogodin/react-native-fs');

let jobId = -1;

export const checkSize = async (filepath, size)  => {
    let stat = await RNFS.stat(filepath).catch((err) => {
        if (__DEV__) { console.log(err.message); }
        return null;
    });
    if (__DEV__) { console.log(stat); }

    // Missing file: treat as needing a (re)download.
    if (!stat) { return true; }

    if (stat.isFile() && stat.size < size) {
        let ret = await RNFS.unlink(filepath).catch((err) => {
            showMessage(err.message, {duration: 2000});
        });
        if (__DEV__) { console.log("deleted file " + filepath)}
        return true;
    }
    return false;
}

// read the medadata file
export const readMetaData = async (filepath) => {
    let contents = await RNFS.readFile(filepath, 'utf8').catch((err) => {
        if (__DEV__) { console.log(err.message, err.code); }
        return null;
    });
    return contents;
}


export const isFileExists = async (url) => {
    const fileName = url.substr(url.lastIndexOf('/') + 1);
    // file name needed
    const downloadDest = Platform.OS === 'ios' ? `${RNFS.LibraryDirectoryPath}/LocalDatabase/${fileName}`
                        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const result = await RNFS.exists(downloadDest).catch((err) => {
            showMessage(err.message, {duration: 2000});
            return ({ res: {'msg': err }, database: { fileName: '', isLoaded: false } });
        });

    if (!result) {
        return ({ database: { fileName: downloadDest, isLoaded: false} });
    } else {
        return ({ res: {'msg': 'database already downloaded' },
             database: { fileName: downloadDest, isLoaded: true} });
    }
}

export const downloadFile = async (background, url, downloadDest, progressFn) => {
    if (jobId !== -1) {
        const err = 'A download is already in progress. Cannot download file ' + url;
        showMessage(err.message, {duration: 2000});
        return { res: {'msg': err }, database: { fileName: '', isLoaded: false } };
    }

    const progress = data => {
        const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
        if (__DEV__) {
            const text = `Progress ${percentage}%`;
            if (__DEV__) { console.log(text); }
        }
        if (progressFn) { progressFn(percentage); }
    };

    const begin = res => {
        if (__DEV__) { console.log('Download has begun'); }
    };

    const progressDivider = 1;

    // The iOS destination folder (Library/LocalDatabase) does not exist on a fresh install.
    const destDir = downloadDest.substring(0, downloadDest.lastIndexOf("/"));
    await RNFS.mkdir(destDir).catch(() => {});

    const ret = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest,
                                begin, progress, background, progressDivider });

    jobId = ret.jobId;

    const result = await ret.promise.catch(err => {
        showMessage(err.message, {duration: 2000});
        jobId = -1;
        return null;
    });

    jobId = -1;
    if (!result || (result.statusCode && result.statusCode >= 400)) {
        return ({ res: { msg: result ? `HTTP ${result.statusCode}` : "download failed" }, database: { fileName: "", isLoaded: false } });
    }
    return ({ res: result, database: { fileName: downloadDest, isLoaded: true } });
}
