quasar build
pause

git add *
pause

git commit -m 'new build'
pause

git push
pause

git subtree push --prefix dist/spa origin gh-pages
pause
