read YEAR MONTH <<< `date +"%Y %m"`
LAST_DAY=`date -d "$MONTH/1 + 1 month - 1 day" +%d`

cd ..

for DAY in `seq -f "%02g" 1 $LAST_DAY`
do
    mkdir -p "$YEAR-$MONTH-$DAY";
done

cd 2017-01-01