async function getArrayOfProjects(token) {
    try {
        const url = "https://gitlab.com/api/v4/user?access_token=" + token;

        const resolve = fetch(url).then((res) => res.json());
        const userData = await Promise.resolve(resolve);
        const userName = userData.username;
        if (!userName) {
            throw "url not valid";
        }

        const userId = fetch(
            `https://gitlab.com/api/v4/users?username=${userName}`
        ).then((res) => res.json());
        const resolvedId = await Promise.resolve(userId);
        if (!resolvedId) {
            throw "url not valid";
        }

        const projects = fetch(
            "https://gitlab.com/api/v4/users/" + resolvedId[0].id + "/projects"
        ).then((res) => res.json());
        if (!projects) {
            throw "url not valid";
        }
        const resolvedProject = await Promise.resolve(projects);

        const projectIds = resolvedProject.map((element) => {
            return [element.id, element.name];
        });
        projectIds.push([36528, "BTC"]);
        return projectIds;
    } catch (err) {
        return ["error"];
    }
}

export default getArrayOfProjects;
