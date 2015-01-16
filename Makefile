.PHONY:	dev clean dist


all:	dev


dev:	vendor
	fig up -d --no-deps mock; fig logs


dist:	vendor
	fig run --no-deps portal gulp build


clean:
	-rm -rf build


vendor:	bower.json .bowerrc
	echo n | fig run --no-deps portal bower --allow-root --force install
