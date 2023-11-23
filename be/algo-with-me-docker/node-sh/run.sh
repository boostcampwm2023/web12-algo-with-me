# PARAM
# $1  COMPETITION_ID
# $2  USER_ID
# $3  PROBLEM_ID
# $4  TESTCASE_ID

# DESCRIPTION
# SUBMISSION_JS_FILE에서 파일을 읽어, node로 실행한다.
# DETAIL_FILE에는 사용한 시간(sec)과 최대 memory 메모리 사용량(KB)이 공백(' ')으로 분리되어 기록된다.

mkdir -p "/algo-with-me/submissions/$1/$2/" || exit 1

SUBMISSION_JS_FILE="/algo-with-me/submissions/$1/$2/$3.js"
DETAIL_FILE="/algo-with-me/submissions/$1/$2/$3.$4.detail"

# 제출된 js 파일이 있으면 node로 js 파일 실행
# 주의: judge.sh와 run.sh는 execute 권한이 부여되어야 함
if [ -f "$SUBMISSION_JS_FILE" ]; then
  echo "[algo-with-me] run.sh: started running $SUBMISSION_JS_FILE. COMPETITION_ID=$1, USER_ID=$2, PROBLEM_ID=$3, TESTCASE_ID=$4"
  # -o FILE Write result to FILE
  # -f FMT  Custom format
  #   U      Total number of CPU-seconds that the process used directly (in user mode), in seconds.
  #   e      Elapsed real (wall clock) time used by the process, in seconds.
  #   M      Maximum resident set size of the process during its lifetime, in Kilobytes.
  #  /usr/bin/time -o "$DETAIL_FILE" -f "%e %M" /algo-with-me/node-sh/runJs.sh "$1" "$2" "$3" "$4"
  /algo-with-me/node-sh/runJs.sh "$1" "$2" "$3" "$4" || exit 2
  echo "[algo-with-me] run.sh: successfully ran $SUBMISSION_JS_FILE. COMPETITION_ID=$1, USER_ID=$2, PROBLEM_ID=$3, TESTCASE_ID=$4"
else
  echo "[algo-with-me] run.sh: cannot find submitted js file $SUBMISSION_JS_FILE"
  exit 3
fi

exit 0
