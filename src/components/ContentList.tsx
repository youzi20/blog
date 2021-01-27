import React from 'react';
import styled from 'styled-components';
import ContentLoader from "react-content-loader";

import { News } from './index';


interface ContentListProps {
    dataSource: any[] | null
}

export const ContentList: React.FC<ContentListProps> = styled(({ className, dataSource }) => {
    return <div className={"youzi-content-list " + className}>

        {dataSource ? dataSource.map(item =>
            <News key={item.id} item={item} />
        ) :
            <div className="youzi-news-loader">
                <ContentLoader
                    speed={2}
                    width="100%"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="3" width="500" height="16" />
                    <circle cx="20" cy="40" r="12" />

                    <rect x="46" y="35" rx="3" width="80" height="10" />
                    <rect x="186" y="35" rx="3" width="120" height="10" />

                    <rect x="0" y="80" rx="3" width="280" height="12" />
                    <rect x="0" y="100" rx="3" width="150" height="12" />
                    <rect x="0" y="120" rx="3" width="350" height="12" />
                </ContentLoader>
            </div>
        }
    </div>
})`
> div {
    margin-bottom: 18px;
}

.youzi-news-loader {
    padding: 30px 20px 0;
    border-radius: 4px;
    box-shadow: 0px 3px 15px 0px #dadada;
}
`;