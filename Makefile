# targets that aren't filenames
.PHONY: all build serve

all: build

build:
	jekyll build

# you can configure these at the shell, e.g.:
# SERVE_PORT=5001 make serve
SERVE_HOST ?= 127.0.0.1
SERVE_PORT ?= 5000

serve: 
	jekyll serve --port $(SERVE_PORT) --host $(SERVE_HOST)	