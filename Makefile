PROD_API_ENDPOINT ?=	https://api.pathwar.net/


.PHONY:	dev clean dist release release_do release_teardown


all:	dev


dev:	vendor
	docker-compose up -d --no-deps mock; docker-compose logs


dist:	vendor
	docker-compose build
	NO_PUSHSTATE=1 API_ENDPOINT=$(PROD_API_ENDPOINT) BASE_PATH=/ docker-compose run --no-deps portal gulp build
	echo portal.github.pathwar.net > CNAME
	touch .nojekyll


clean:
	-rm -rf build

release:	clean
	$(MAKE) release_do || $(MAKE) release_teardown


release_do:
	git branch -D gh-pages || true
	git checkout -b gh-pages
	$(MAKE) dist
	ls -la
	find . ! -name .git ! -name build ! -name CNAME ! -name Makefile ! -name docker-compose.yml -maxdepth 1 -exec rm -rf {} \;
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
