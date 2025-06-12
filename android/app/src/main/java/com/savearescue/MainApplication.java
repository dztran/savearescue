package com.savearescue;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.soloader.SoLoader;

import com.savearescue.BuildConfig; // Ensure you have the correct import for BuildConfig
import java.util.List;
import com.facebook.react.ReactPackage;
import com.facebook.react.PackageList; // Import PackageList for automatic package management
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Add your custom packages here
        // packages.add(new YourCustomPackage());
        // Example: packages.add(new MyCustomPackage());
        // If you have any native modules, you can add them here
        return packages;
    }
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
