import React, { useState } from "react";
import OutsideClick from "../../../utils/OutsideClick";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button, SIZE } from "baseui/button";
import usePostLearningResource from "../hooks/usePostLearningResource";

function PostLearningResource({
    setPostLearningResource,
    fetchLearningResources,
}) {
    const [postError, postResource] = usePostLearningResource();
    const [value, setValue] = useState({
        title: "",
        link: "",
    });
    function handleClose(e) {
        setPostLearningResource(false);
    }
    function handleSubmit(e) {
        e.preventDefault();
        postResource(value);
        fetchLearningResources();
        handleClose();
    }
    function handleChange(e) {
        setValue({ ...value, [e.currentTarget.name]: e.currentTarget.value });
    }
    return (
        <div className="postResource">
            <OutsideClick handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <FormControl label={() => "Title"}>
                        <Input
                            placeholder="Enter Title"
                            value={value.title}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            size={SIZE.compact}
                        />
                    </FormControl>
                    <FormControl label={() => "Link"}>
                        <Input
                            placeholder="Enter Link"
                            value={value.link}
                            type="text"
                            name="link"
                            onChange={handleChange}
                            size={SIZE.compact}
                        />
                    </FormControl>
                    <div className="postResource__btnHolder">
                        <Button
                            type="submit"
                            className="btnCustom"
                            size={SIZE.compact}
                        >
                            Post
                        </Button>
                        <Button
                            onClick={handleClose}
                            className="btnCustom--tertiary ml1"
                            size={SIZE.compact}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </OutsideClick>
        </div>
    );
}

export default PostLearningResource;
