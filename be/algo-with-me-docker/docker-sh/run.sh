sudo docker run -d \
-p 5000:5000 \
-e COMPETITION_ID=$1 \
-e USER_ID=$2 \
-e PROBLEM_ID=$3 \
-e TESTCASE_ID=$4 \
-v $HOME/algo-with-me/problems:/algo-with-me/problems:ro \
-v $HOME/algo-with-me/testcases:/algo-with-me/testcases:ro \
-v $HOME/algo-with-me/submissions:/algo-with-me/submissions \
--user "$(id -u)":"$(id -g)" \
--name algo-with-me-docker \
algo-with-me-docker:latest

#--network none \
#--network isolatedNetwork \