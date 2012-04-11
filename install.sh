LOCATION=`pwd`
PROFILES="/Users/$(whoami)/Library/Application Support/Firefox/Profiles/"
DEV_PROFILE=`ls "$PROFILES" | grep .dev`
mkdir -p "$PROFILES/$DEV_PROFILE/extensions/" 
echo $LOCATION > "$PROFILES/$DEV_PROFILE/extensions/zogger@personal.com" 
