#!/bin/bash

# configuration variables
TARGET="admin@www.33thirdproductions.com:sites/www.33thirdproductions.com"

# convenience variables
SITEPATH=`dirname "$0"`
OURNAME=`basename "$0"`

# don't take out the wiki!  also, we keep some source files and notes here
# that don't need to go public; we may want to send SVG files once they get
# decent support
#EXCLUDE='--exclude '"'"'*.sh'"'"' --exclude notes --exclude '"'"'*.svn*'"'"' --exclude '"'"'*~'"'"' --exclude '"'"'*.xcf'"'"' --exclude '"'"'*.svg'"'"' --exclude '"'$OURNAME'"' --exclude "wiki"'

# recursively copy the files (r) and delete non-copied files at destination using compression (z); exclude SVN directories, save files, and this script
# rsync -zvr --delete $EXCLUDE $SITEPATH $TARGET
echo rsync -zvvr --exclude '*.sh' --exclude notes --exclude '*.svn*' --exclude '*~' --exclude '*.xcf' --exclude '*.svg' --exclude "$OURNAME" --exclude "wiki" $SITEPATH $TARGET
# TODO: I want to use the $EXCLUDE, but I was having a terrible time getting the quote processing right
rsync -zvvr --exclude '*.sh' --exclude notes --exclude '*.svn*' --exclude '*~' --exclude '*.xcf' --exclude '*.svg' --exclude "$OURNAME" --exclude "wiki" $SITEPATH $TARGET

