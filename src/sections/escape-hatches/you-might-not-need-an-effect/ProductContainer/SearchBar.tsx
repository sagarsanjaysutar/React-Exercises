import React, { FC, useEffect, useRef, useState } from 'react';
import { Product } from './type';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Select, SelectProps, Space } from 'antd';

type SearchBarProp = {
    onSearch: (searchStr: string) => void;
    searchedList: Product[];
    onSearchedProductClicked: (productKey: number) => void;
};

const SearchBar: FC<SearchBarProp> = ({ onSearch, searchedList, onSearchedProductClicked }) => {
    // Transforming data as per AntD's dropdown component.
    const data: SelectProps['options'] = searchedList.map((item) => {
        return {
            key: item.id,
            value: item.title,
        };
    });

    // Search Value
    const [searchValue, setSearchValue] = useState('');

    // Returns a markup containing "text" with "subtext" being bold.
    function boldSubtext(text: string, subtext: string): React.ReactNode {
        let subtextStartIndex = text.toLowerCase().indexOf(subtext.toLowerCase());
        if (subtextStartIndex >= 0) {
            let subtextEndIndex: number = subtextStartIndex + subtext.length;
            return (
                <p>
                    {text.substring(0, subtextStartIndex)}
                    <b>{text.substring(subtextStartIndex, subtextEndIndex)}</b>
                    {text.substring(subtextEndIndex, text.length)}
                </p>
            );
        } else {
            return <p>{text}</p>;
        }
    }

    // Workaround for settings Antd's dropdown width which needs to be changed for UI purpose.
    const containerRef = useRef(null);
    const [dropdownWidth, setDropdownWidth] = useState(0);
    useEffect(() => {
        console.log(searchedList.length);
        setDropdownWidth(containerRef.current.clientWidth);
    }, []);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="bg-slate-400 rounded-lg" ref={containerRef}>
            <Space.Compact block>
                <Select
                    style={{ width: '100%' }}
                    size="large"
                    showSearch
                    options={data}
                    placeholder="Search for products..."
                    suffixIcon={null}
                    dropdownStyle={{ width: dropdownWidth }}
                    onSearch={(searchStr) => {
                        setSearchValue(searchStr);
                        onSearch(searchStr);
                        setDropdownOpen(searchStr != '');
                    }}
                    notFoundContent={<>No such product found.</>}
                    allowClear
                    open={dropdownOpen}
                    searchValue={searchValue}
                    // If the searchedValue is present in the dropdown option, then it is made bold.
                    optionRender={(option) => <>{boldSubtext(option.data.value, searchValue)}</>}
                    onSelect={(value, option) => {
                        onSearchedProductClicked(option.key);
                        setDropdownOpen(false);
                    }}
                ></Select>
                <Button
                    size="large"
                    type="text"
                    className="bg-slate-600 text-slate-200"
                    icon={<SearchOutlined />}
                />
            </Space.Compact>
        </div>
    );
};

export default SearchBar;
