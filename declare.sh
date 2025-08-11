#!/bin/bash

_pause(){ read; }

(return 0 2>/dev/null)
if [[ "$?" == 0 ]]; then
	echo ERROR: must not be sourced; _pause
	return 1
fi

git_bash_path="$(cd $(dirname ${BASH_SOURCE[0]}); pwd)/git.bash"
git_bash ()	{
	bash "$git_bash_path" "$@"
}
declare -p git_bash_path
declare -f git_bash
