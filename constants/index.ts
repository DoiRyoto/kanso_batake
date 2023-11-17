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

export type userType = {
    id: string;
    name: string;
    affiliation: string[];
    field: string[];
    role: string;
    // いったん　Student or Teacher
    reviews: reviewType[];
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

const reviewData_miura: reviewType[] = [
    {
        id: "99",
        contents: "この論文は、ニューラルネットワークを用いたオートエンコーダーを初めて提案したものである。\n\
        この論文が投稿された背景として、これまでオートエンコーダーは提案されていたが、大量のデータセットとそれを処理できるコンピューティング環境がないことが問題であった。しかし、ハードの進化によってそれらが可能になり、マルチレイヤーのディープなニューラルネットでそれらが可能になり、オートエンコーダが実現可能になった。\n\
        オートエンコーダによるデータの次元圧縮は、これまでのPCAによるものよりも、視覚化と画像再構成、識別のタスクでPCAを上回っていることが報告された。\n\
         特に重要な技術は、オートエンコーダのそれぞれの層を制約付きボルツマンマシン（RBM）として事前学習することで、ネットワークの初期重みをできるだけ解に近づけたことである。\n\
         これによってエンコーダ学習時の収束性がよくなった。\n\
         しかしこれらの技術は、近年のバッチ正規化やドロップアウト、Relu関数の発明により必要なくなったりしている。\n\
         ボルツマンマシンの話がよくわからなかったので今後勉強したい。",
        paperTitle: "Reducing the Dimensionality of Data with Neural Networks",
        reviewerName:"三浦隼"
    },
    {
        id: "100",
        contents: "この論文は、シーンダイナミクスや物体の動きを学習するために大量のラベルなし動画データを使用した、動画生成モデル（GAN）を提案したものである。\n\
        新規性としては、ゼロから学習するUnconditionalな動画生成モデルを提案したことと、1枚のフレームを生成するモデルではなく、一連の動画フレームを生成するようにしたことである。\n\
         特に、生成動画の背景は固定されていて、前景だけ動いてるものを前提としていることが重要だと思った。\n\
         これはつまり、カメラが固定されている条件、を表しているのだと知って、なるほどと思った。\n\
         また、畳み込み処理として空間方向と時間方向を処理する3次元畳み込みを使用している。\n\
         自分での追試をしようと思ったけど、動画フレームのデータセットのサイズが大きいし、一つの動画を何シーンにも区切ってるようなデータセットで、なんかデータセットの多様性が担保されているのかよくわからなかった。\n\
         動画の生成はメモリコストも時間的コストも大きくて、単なる一つのＧＰＵではなかなか学習が大変だと思った。\n\
         生成された動画の定量的な評価として、100人くらいの人に、「どの動画が最も現実に近いですか？」みたいなアンケートをして測定しているので、人間に頼らない定量的な評価指標がないものかと思った。（FVDってのがあるらしい）",
        paperTitle: "Generating videos with scene dynamics",
        reviewerName:"三浦隼"
    },
    {
        id: "101",
        contents: "貢献ーーーーーーーーーーーーーーーーーーーー\n\
        ・OBD は学習するネットワークの重みを選択的に削除してサイズを小さくする。\n\
        OBD は2 つの用途がある。1 つ目は自動的にニューラルネットワークを最適化する。2 つ目は最善のネットワーク構造を提案すること。\n\
        ・「重みの大きさは顕著性」という直感を超えて、理論的に顕著性を計測する方法を提案した。そこでパラメータに対する目的関数の二次導関数を使用して顕著性を測った。\n\
        手法の重要なとこーーーーーーーーーーーー\n\
        ネットワークのパラメータに摂動を加えた時の目的関数の変動を次のように近似したこと\n\
        ・テイラー展開\n\
        ・2次近似\n\
        ・対角近似\n\
        ・極地近似\n\
        感想ーーーーーーーーーーーーーーーーーーーー\n\
        モデル圧縮のPruningの元となる論文だった。\n\
        パラメータに何か処理した時の目的関数の変化っていうのは最近の手法でも取り入れられてる手法だから、やっぱりこの方法が一般的なのかな。\n\
         1980年代の論文って文字がデジタルじゃない？から読みづらいな。",
        paperTitle: "Optimal Brain Damage",
        reviewerName:"三浦隼"
    },
    {
        id: "102",
        contents: "【どんなもの？】\n\
        ・ネットワーク内のフィルタやチャネルの重要度を、マスクした際の損失関数の減少から重要度スコアを計算し、重要度スコアの小さいものから刈り込む構造的Pruning である。\n\
        【新規性？】\n\
        ・異なる層において一貫した尺度を持つフィルタの重要度測定基準を提供し、各層の圧縮率を\n自動的に決定できる。\n\
        ・”global pruning”と”input channel selection”を用いてアルゴリズムを修正し、マルチブランチ及び密な結合のCNN の刈り込みを可能にした。\n【技術や手法の肝はどこ？】\n\
        ・ランダムなマスクを適用したときの損失関数の減少幅を、マスクしたフィルタの重要性と定義するところ。\n\
        • ResNet ではスキップ接続で同様の次元数をもつbranch を同じグループとして、グループ内のフィルタのうち最大の重要度スコアを、そのグループの重要度として定義するところ。\n\
        • DenseNet ではチャネル選択層を畳み込み層の前に挿入し、複雑なDenseNet の出力チャネルの計算に対応したところ。\n\
        【どうやって有効だと検証した？】\n\
        CIFAR10 データセットでVGG-16,ResNet110,DenseNet-40 のモデルを様々な選考手法で圧縮した際のFLOPs と提案手法の圧縮後のFLOPs を揃えて比較し、優れた性能であることを示した。\n\
        またILSVRC2012 データセットでResNet-50 でも行った。\n\
        AblationStudy として、一つづつフィルタを削除して評価するOraclePruning と比べ同等の性能を持ちながら提案手法のほうが処理時間が小さいことを示した。\n\
        また複数のランダムシードを使用してバイナリマスクを生成した際に削除されるフィルタの一貫性を調べ、シードによらず一貫性のあるフィルタが削除されていることを示した。\n\
        さらにシードによらず各層における圧縮率の類似性を調べ、高く類似していることを示した。\n\
        【議論はある？】\n\
        ・フィルタの重要度を計測する際にValidationデータを用いて順伝播する必要があるので計算コストが大きいこと。\n\
        ・フィルタの重要度を計測する際のバイナリマスクの多様性は担保されているか。つまりちゃんとすべてのフィルタがマスクされ評価されているか。\n\
        • 重要度としてマスクした際の損失関数の動き具合に絶対値は要らないのか。式2\n\
        \n\
        【感想】\n\
        ・モンテカルロ法に基づいてランダムにマスクした時の損失関数の変動っていう、結構簡単な処理でフィルタの重要度を計測しているから、なんか良さそう。\n\
        ・アルゴリズムが簡単なのはいいこと。\n\
        ・実験パートですごいいろんな先行研究と対象モデルで実験してて大変そうだった。自分だったらこんなに比較検証できない。",
        paperTitle: "Network pruning via probing the importance of filters",
        reviewerName:"三浦隼"
    }
]

export const miuraData: userType = {
    id: "1",
    name: "miura",
    affiliation: ["適応情報処理研究室", "情報理工学位プログラム"],
    field: ["Machine Learning", "Deep Learning"],
    role: "Student",
    reviews: reviewData_miura
}