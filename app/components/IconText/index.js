import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles, {INPUT_HEIGHT, colors} from './styles';

const IconText = ({ style, styleText, styleIcon, onPress, value, icon }) => (
    <View style={[styles.root, style]}>
        <TouchableOpacity onPress={onPress} style={styles.content}>
            <Text style={[styles.text, styleText]}>{value}</Text>
                {icon ? <Icon size={INPUT_HEIGHT/2}
                    style={[styles.icon, styleIcon]} name={icon}/> : null}
        </TouchableOpacity>
    </View>
);

IconText.propTypes = {
    style: PropTypes.any,
    styleText: PropTypes.any,
    styleIcon: PropTypes.any,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    value: PropTypes.string,
};

export default IconText;
