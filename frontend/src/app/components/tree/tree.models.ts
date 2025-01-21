export type TreeDefinition = {
    name: string;
    action?: () => void;
    nodes: TreeDefinition[];
}

