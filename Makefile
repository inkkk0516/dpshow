NODE		?= node
CWD			?= $(shell pwd)

cfg = \
if [ -f .config.js ]; then \
	cat .config.js > config.js; \
else \
	cat .cfg.js > config.js; \
fi

.PHONY: all build dev install pull

.SECONDEXPANSION:

all: build

build:
	@$(call cfg)
	@npm run $@
	@cd out; tar cfvz dphoto-hacker.tgz public

dev:
	@$(call cfg)
	@npm run $@

pull:
	@git pull; \
	if [ ! -d ../cport-h5 ]; then \
		cd .. && git clone http://gitlab.hard-chain.cn/cport/cport-h5.git; \
	else \
		cd ../cport-h5 && git pull; \
	fi

lc_link = if [ -d $1 ]; then \
	if [ -L $1 ]; then \
		rm node_modules/cport-h5/node_modules/$(shell basename $1); \
	else \
		rm -rf node_modules/cport-h5/node_modules/$(shell basename $1);\
	fi; \
	ln -s $1 node_modules/cport-h5/node_modules/$(shell basename $1); \
fi

install: pull
	@if [ ! -L ./nifty ]; then \
		rm -rf nifty; \
		ln -s ../cport-h5/nifty; \
	fi
	@-npm install
	@rm -rf ../node_modules && ln -s cport-h5/node_modules ../node_modules

# @$(call lc_link,$(NGUI)/libs/nxkit)
# @$(call lc_link,$(CWD)/../crypto-tx)
# @$(call lc_link,$(CWD)/../dphoto-magic-sdk)
