package com.niceshotapps.sendsms;

import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.telephony.SmsManager;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.URL;
import java.net.URLConnection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import fi.iki.elonen.NanoHTTPD;
import org.apache.commons.io.*;


public class MainActivity extends AppCompatActivity {
    /**
     * Get IP address from first non-localhost interface
     * @param ipv4  true=return ipv4, false=return ipv6
     * @return  address or empty string
     */
    public static String getIPAddress(boolean useIPv4) {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                for (InetAddress addr : addrs) {
                    if (!addr.isLoopbackAddress()) {
                        String sAddr = addr.getHostAddress();
                        //boolean isIPv4 = InetAddressUtils.isIPv4Address(sAddr);
                        boolean isIPv4 = sAddr.indexOf(':')<0;

                        if (useIPv4) {
                            if (isIPv4)
                                return sAddr;
                        } else {
                            if (!isIPv4) {
                                int delim = sAddr.indexOf('%'); // drop ip6 zone suffix
                                return delim<0 ? sAddr.toUpperCase() : sAddr.substring(0, delim).toUpperCase();
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) { } // for now eat exceptions
        return "";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView label = (TextView)findViewById(R.id.label);
        label.setText("Go to http://"+getIPAddress(true)+":8080/");

        try {
            new Server(this);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public String getAsset(String path) {
        StringBuilder contents=new StringBuilder();
        InputStream json= null;
        try {
            InputStream asset = getAssets().open(path);
            char buf[] = new char[1024];
            InputStreamReader in= new InputStreamReader(asset, "UTF-8");
            int cnt = 0;
            while ((cnt = in.read(buf)) != -1) {
                contents.append(new String(buf, 0, cnt));
            }

            in.close();
            return String.valueOf(contents);
        } catch (IOException e) {
            return null;
        }
    }

    public class Server extends NanoHTTPD {

        private final MainActivity app;

        public Server(MainActivity app) throws IOException {
            super(null, 8080);
            this.app = app;
            start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        }


        @Override
        public Response serve(IHTTPSession session) {
            String path = session.getUri().substring(1);
            if(path.equals("")) {
                path = "index.html";
            }
            if(path.startsWith("api/send")) {
                try {
                    session.parseBody(new HashMap<String, String>());
                    Map<String, String> params = session.getParms();
                    SmsManager.getDefault().sendTextMessage(params.get("to"), null, params.get("text"), null, null);
                    Response res = newFixedLengthResponse(Response.Status.REDIRECT,  NanoHTTPD.MIME_HTML, "");
                    res.addHeader("Location", "/");
                    return res;
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (ResponseException e) {
                    e.printStackTrace();
                }
            }

            return newFixedLengthResponse(app.getAsset(path));
        }
    }
}
