using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace UdpClientExample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (UdpClient client = new UdpClient(22000))
            {
                var stop = false;
                Task.Run(async () =>
                {
                    while (!stop)
                    {
                        var packet = await client.ReceiveAsync();
                        var payload = Encoding.ASCII.GetString(packet.Buffer);
                        Console.WriteLine(payload);
                        if (payload == "stop")
                        {
                            stop = true;
                        }
                    }
                }).Wait();
            }
            
        }
    }
}