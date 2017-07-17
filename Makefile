#
# Makefile
#
# Author:  Lars Thoms <lars.thoms@spacecafe.org>
# Version: 2016-06-27
#
#

# =====[ Configurations ]===========================================================================

CC      = sassc
CFLAGS  = -t compressed
SOURCES = assets/css/timeslider.sass
RESULT  = $(SOURCES:.sass=.css)


# =====[ Code ]=====================================================================================

all: $(RESULT)

%.css: %.sass
	$(CC) $(CFLAGS) $< $@
