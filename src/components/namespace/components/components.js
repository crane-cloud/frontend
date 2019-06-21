export default [

    {
        id: 10,
        component: "Workloads",
        subcomponent: {
            deployments: "Deployments",
            replicaSets: "Replica Sets",
            replicaControllers: "Replication controllers",
            deamonSets: "Deamon Sets",
            petSets: "Pet Sets",
            jobs: "Jobs",
            pods: "Pods"
        }
    },
    {
        id: 20,
        component: "Services&Discovery",
        subcomponent: {
            services: "Services",
            ingresses: "Ingresses"
        }
    },
    {
        id: 30,
        component: "Storage",
        subcomponent: {
            persistentvolumes: "Persistent Volume Claims"
        }
    },
    {
        id: 40,
        component: "Config",
        subcomponent: {
            secrets: "Secrets",
            configMaps: "Config Maps"
        }
    }
];