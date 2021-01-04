const ProjectDir = /src\/(.*?)\//;

module.exports = (t) => {
    return {
        name: "@aykelith/xalgenezis-checker",
        visitor: {
            Program(path, { opts: { remove = 'none' } } = {}) {
                if (remove === 'none') return;
                const _remove = getRemoveType(remove);
                path.traverse({
                    enter(path) {
                        const leadingCommentsList = path.node.leadingComments || [];
                        const trailingCommentsList = path.node.trailingComments || [];
                        if (leadingCommentsList.length > 0 || trailingCommentsList.length > 0) {
                            if (_remove === 'all') {
                                t.removeComments(path.node);
                            } else {
                                // t.removeComments是清空全部注释，并不能区分去掉哪种注释
                                // t.removeComments(path.node);
                                path.node.leadingComments = filterComments(leadingCommentsList, path, _remove);
                                path.node.trailingComments = filterComments(trailingCommentsList, path, _remove);
                            }
                        }
                    },
                });
            },
        }
    };
};