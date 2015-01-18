.PHONY:	dev clean dist release release_do release_teardown


all:	dev


dev:	vendor
	fig up -d --no-deps mock; fig logs


dist:	vendor
	fig build
	API_ENDPOINT=http://212.83.158.125:1337/ BASE_PATH=/portal.pathwar.net/ fig run --no-deps portal gulp build


clean:
	-rm -rf build


vendor:	bower.json .bowerrc
	echo n | fig run --no-deps portal bower --allow-root --force install


release:	clean
	$(MAKE) release_do || $(MAKE) release_teardown


release_do:
	git branch -D gh-pages || true
	git checkout -b gh-pages
	$(MAKE) dist
	ls -la
	find . ! -name .git ! -name build ! -name Makefile ! -name fig.yml -maxdepth 1 -exec rm -rf {} \;
	mv build/* .
	rmdir build
	git add .
	git commit -am "Build gh-pages"
	git push -u origin gh-pages -f
	$(MAKE) release_teardown


release_teardown:
	git checkout master


local_install:
	npm install
	npm run prestart


travis:
	echo "FIXME: add tests"
