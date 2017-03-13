#!/bin/sh

switchToBranchRelease () {
    # check branch release exist
    origin=$(git ls-remote --heads git@github.com:M6Web/drinkjs.git release)

    if [ -z "$origin" ]; then
        git checkout -q -f --orphan release \
        && git reset
    else
        git branch -D release \
        && git checkout --track origin/release
    fi
}

if [ -n "$(git status --porcelain)" ]; then
  echo "Git repository is dirty."
  #exit 1
fi

branch=$(git symbolic-ref --short HEAD 2>/dev/null)

npm run clean

if [ "$branch" = "master" ]; then
    case $1 in
        --minor)
            version=$(npm version minor --no-git-tag-version)
        ;;
        --major)
            version=$(npm version major --no-git-tag-version)
        ;;
        --patch)
            version=$(npm version patch --no-git-tag-version)
        ;;
    esac

    if [ -z "$version" ]; then
      echo "Invalid argument"
      exit 1
    fi

    commitMessage="Release $version"

    npm prune \
    && npm install \
    && NODE_ENV=production babel src -d lib --copy-files --ignore __tests__ \
    && git clone git@github.com:M6Web/drinkjs.git .tmp \
    && cd .tmp \
    && switchToBranchRelease \
    && cp -rf ../lib lib \
    && cp ../package.json . \
    && git add -f lib \
    && git add package.json \
    && git commit -m "$commitMessage" \
    && git tag -a -f "$version" -m "$commitMessage" \
    && git push -f origin release \
    && git push -f origin $version \
    && cd .. \
    && npm run clean \
    && git add package.json \
    && git commit -m "$commitMessage" \
    && git push origin master
else
    if [ $1 ];then
        echo "Arguments not supported for stage release."
        exit 1
    fi

    npm prune \
    && npm install \
    && git checkout -q -f --orphan stage-$branch \
    && git reset \
    && NODE_ENV=production babel src -d lib --copy-files --ignore __tests__ \
    && git add -f lib \
    && git add package.json \
    && git commit -m "Release $branch" \
    && git push origin stage-$branch -f \
    && git clean -fd \
    && git checkout $branch \
    && git branch -D stage-$branch \
    && npm run clean
fi
