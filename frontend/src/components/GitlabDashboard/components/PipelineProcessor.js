class RequestPipeline {
    constructor(steps, previousResult, shouldExecuteNext) {
        this.steps = steps;

        this.previousResult = previousResult;
        this.shouldExecuteNext = shouldExecuteNext;
    }
    async processor() {
        let numberofsteps = this.steps.length;

        for (let i = 0; i < numberofsteps; i++) {
            const result = await this.shouldExecuteNext(
                this.steps[i],
                this.previousResult
            );

            if (!result) {
                break;
            }

            this.previousResult = result;
        }
        return this.previousResult;
    }
}
export default RequestPipeline;
