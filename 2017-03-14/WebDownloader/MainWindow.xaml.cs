using System;
using System.Windows;
using System.Net;

namespace FacebookLoginApp
{
    /// <summary>
    /// Logika interakcji dla klasy MainWindow.xaml
    /// </summary>


    public partial class MainWindow : Window
    {
        private const string ExtendedPermissions = "";
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Button_ClickAsync(object sender, RoutedEventArgs e)
        {
            WebClient client = new WebClient();
            String downloadedString = await client.DownloadStringTaskAsync(new Uri("https://cdnjs.cloudflare.com/ajax/libs/riot/3.3.2/riot.min.js"));
            resultTextBox.Text = downloadedString;

        }

   
    }
}
