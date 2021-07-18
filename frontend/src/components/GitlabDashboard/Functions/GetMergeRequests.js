async function getMergeRequests(arrayOfProjects) {
    try {
        const promisesToresolve = [];
        for (let i = 0; i < arrayOfProjects.length; i++) {
            promisesToresolve.push(
                fetch(
                    `https://gitlab.com/api/v4/projects/${arrayOfProjects[i][0]}/merge_requests`
                ).then((res) => res.json())
            );
        }

        let mergeRequestsResult = await Promise.all(promisesToresolve);

        for (let i = 0; i < mergeRequestsResult.length; i++) {
            if (mergeRequestsResult[i].message === "404 Project Not Found") {
                return [];
            }
        }
        return [mergeRequestsResult, arrayOfProjects];
    } catch (err) {
        return ["error"];
    }
}

export default getMergeRequests;
