# Build the Quasar project
quasar build
if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Stage changes
git add .
if [ $? -ne 0 ]; then
    echo "git add failed. Exiting."
    exit 1
fi

# Commit changes
git commit -m 'new build'
if [ $? -ne 0 ]; then
    echo "git commit failed. Exiting."
    exit 1
fi

# Push to the remote repository
git push
if [ $? -ne 0 ]; then
    echo "git push failed. Exiting."
    exit 1
fi

# Push to GitHub Pages
git subtree push --prefix dist/spa origin gh-pages
if [ $? -ne 0 ]; then
    echo "git subtree push failed. Exiting."
    exit 1
fi
