import React, { useState } from 'react';

import { UserInfo, Menus, Sidebar } from './index';

export const Common = ({ menu, onChangeMenu }) => {

    return <>
        <UserInfo />
        <Menus
            value={menu}
            onChange={(val) => onChangeMenu(val)}
        />
        <Sidebar />
    </>
};