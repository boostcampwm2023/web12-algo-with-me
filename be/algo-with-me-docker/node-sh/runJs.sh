# PARAM
# $1  COMPETITION_ID
# $2  USER_ID
# $3  PROBLEM_ID

# DESCRIPTION
# node로 제출한 파일을 실행한다.
# stdout, stderr는 각각 STDOUT_FILE, STDERR_FILE에 기록된다.
# RESULT_FILE에는 제출한 파일의 solution() 값이 기록되는데, shell script 상에서는 할 수 없어 템플릿 코드에서 기록해주어야 한다.
# node 실행할 때 첫번째 인자로 RESULT_FILE의 파일 경로를 입력해준다.

SUBMISSION_JS_FILE="/algo-with-me/submissions/$1/$2/$3.js"
STDOUT_FILE="/algo-with-me/submissions/$1/$2/$3.stdout"
STDERR_FILE="/algo-with-me/submissions/$1/$2/$3.stderr"
RESULT_FILE="/algo-with-me/submissions/$1/$2/$3.result"

node "$SUBMISSION_JS_FILE" "$RESULT_FILE" 1> "$STDOUT_FILE" 2> "$STDERR_FILE"

exit
