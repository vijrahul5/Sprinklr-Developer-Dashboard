async function getPipeline(arr) {
    try {
        let mergeRequestsResult = arr[0];
        const promisesToresolve = [];
        for (let i = 0; i < mergeRequestsResult.length; i++) {
            if (mergeRequestsResult[i].length != 0) {
                for (let j = 0; j < mergeRequestsResult[i].length; j++)
                    promisesToresolve.push(
                        fetch(
                            `https://gitlab.com/api/v4/projects/${mergeRequestsResult[i][j].project_id}/merge_requests/${mergeRequestsResult[i][j].iid}/pipelines`
                        ).then((res) => res.json())
                    );
            }
        }

        let pipelineResult = await Promise.all(promisesToresolve);
        for (let i = 0; i < pipelineResult.length; i++) {
            if (pipelineResult[i].message === "404 Project Not Found") {
                return [];
            }
        }
        return [pipelineResult, ...arr];
    } catch (err) {
        return ["error"];
    }
}
export default getPipeline;
