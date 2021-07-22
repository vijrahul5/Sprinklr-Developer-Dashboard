async function getMergeRequests(arr) {
    try {
        const arrayOfProjects = arr[0];
        const token = arr[1];
        const promisesToresolve = [];
        for (let i = 0; i < arrayOfProjects.length; i++) {
            promisesToresolve.push(
                fetch(
                    `https://gitlab.com/api/v4/projects/${arrayOfProjects[i][0]}/merge_requests?access_token=${token}`
                ).then((res) => res.json())
            );
        }

        let mergeRequestsResult = await Promise.all(promisesToresolve);

        for (let i = 0; i < mergeRequestsResult.length; i++) {
            if (mergeRequestsResult[i].message === "404 Project Not Found") {
                return [];
            }
        }
        console.log(mergeRequestsResult);
        return [mergeRequestsResult, arrayOfProjects, token];
    } catch (err) {
        return ["error"];
    }
}

export default getMergeRequests;
