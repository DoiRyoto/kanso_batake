type paperInterface = {
    id: string;
    title: string;
    tldr: string;
}

export type reviewType = {
    id: string;
    contents: string;
    paperTitle: string;
    reviewerName: string;
}

export const paperData: paperInterface[] = [
    {
        id: "1",
        title: "Python",
        tldr: "Programming langauge"
    },
    {
        id: "2",
        title: "情報工学先生",
        tldr: "論文検索システム"
    }
]

export const reviewData: reviewType[] = [
    {
        id: "1",
        contents: "さいこう",
        paperTitle: "How to use Python",
        reviewerName:"三浦隼"
    },
    {
        id: "2",
        contents: "イマイチ",
        paperTitle: "How to use Python",
        reviewerName:"土居亮斗"
    },
    {
        id: "3",
        contents: "いいね",
        paperTitle: "How to use TypeScript",
        reviewerName:"三浦隼"
    },
    {
        id: "4",
        contents: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        paperTitle: "How to use TypeScript??????????????????????????????????????????????????????????????????????????????????????????????????????",
        reviewerName:"三浦隼"
    }
]