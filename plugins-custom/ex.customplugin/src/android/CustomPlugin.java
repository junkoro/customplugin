package ex.customplugin;


import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;


/**
 * Cordovaカスタムプラグイン
 */
public class CustomPlugin extends CordovaPlugin {


    private Context context;
    public static final String CMD_SHOW_NOTIFICATION = "showNotification";


    /**
     * コンストラクタ（プラグイン時）
     */
    public CustomPlugin() {
    }


    /**
     * コンストラクタ（非プラグイン時）
     */
    public CustomPlugin(Context context) {
        this.context = context;
        init();
    }


    /**
     * Cordovaプラグインとして動作するときの初期化処理
     *
     * @param cordova
     * @param webView
     */
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = cordova.getActivity();
        init();
    }


    /**
     * 初期化
     */
    private void init() {
        Log.i(null, "カスタムプラグイン初期化");
    }


    /**
     * cordovaプラグインの実行
     *
     * @param action
     * @param args
     * @param callbackContext
     * @return
     * @throws JSONException
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.i(null, "カスタムプラグイン実行 action=" + action);
        String msg = "対応コマンドがありません";
        if (action.equals(CMD_SHOW_NOTIFICATION)) {
            String title = "タイトル";
            if (args.length() > 0) {
                title = args.getString(0);
            }
            String text = "テキスト";
            if (args.length() >=1) {
                text = args.getString(1);
            }
            showNotification(title, text);
        } else {
            if (callbackContext != null) {
                callbackContext.error(msg);
            }
            Log.w(null, msg);
            return false;
        }
        if (callbackContext != null) {
            callbackContext.success();
        }
        return true;
    }


    /**
     * ノーティフィケーション表示
     *
     * @param title
     * @param text
     */
    private void showNotification(String title, String text) {
        Toast.makeText(context, "ノーティフィケーション表示", Toast.LENGTH_LONG).show();
        Log.i(null, "ノーティフィケーション表示 title=" + title + " text=" + text);
        int NOTIF_ID = 1234;
        Notification notif = new NotificationCompat.Builder(context)
                .setSmallIcon(R.drawable.ic_stat_notif_icon)
                .setAutoCancel(true)
                .setContentTitle(title)
                .setContentText(text)
                .build();
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.notify(NOTIF_ID, notif);
    }


} //END class
