import java.util.Calendar
import java.text.SimpleDateFormat


object Clock {
  def main(args: Array[String]): Unit = {
    while(true) {
      val now = Calendar.getInstance().getTime()
      val fmt = new SimpleDateFormat("HH:mm:ss");    
      print(fmt.format(now)+"\r");
      Thread.sleep(100);
    }
  }
}