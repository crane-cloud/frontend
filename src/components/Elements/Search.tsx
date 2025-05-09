import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { Select, Loader } from '@mantine/core'
import useGet from '@/utils/useGet';
import { returnObject } from '@/utils/helpers';

const Search = ({ type }: { type?: 'projects' | 'apps' | 'users' | 'tags' }) => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const { data: searchData, getData: getSearchData, loading } = useGet();

    // Handle search API call with debounce
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchValue.trim()) {
                getSearchData({
                    api: `/search`,
                    params: {
                        keywords: searchValue,
                        type,
                    },
                });
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchValue]);

    // Transform API response to Select options
    const searchOptions = [
        ...returnObject(
            searchData?.data?.projects?.items?.length > 0, [
            {
                group: 'Projects',
                items: searchData?.data?.projects?.items?.map((item: any) => ({
                    label: `${item.name}`,
                    value: item?.id,
                    original: item,
                    type: 'project'
                }))
            }]
        ),
        ...returnObject(
            searchData?.data?.apps?.items?.length > 0, [
            {
                group: 'Apps',
                items: searchData?.data?.apps?.items?.map((item: any) => ({
                    label: `${item.name}`,
                    value: item.id,
                    original: item,
                    type: 'app'
                }))
            }]
        ),
        ...returnObject(
            searchData?.data?.users?.items?.length > 0, [
            {
                group: 'Users',
                items: searchData?.data?.users?.items?.map((item: any) => ({
                    label: `${item.name}`,
                    value: item.id,
                    original: item,
                    type: 'user'
                }))
            }]
        )
    ];

    const handleSelect = (id: any, option: any) => {
        if (id && option) {
            switch (option.type) {
                case 'project':
                    navigate(`/projects/${option.original.id}`);
                    setSearchValue('');
                    break;
                case 'app':
                    navigate(`/projects/${option.original.project_id}/apps/${option.original.id}`);
                    setSearchValue('');
                    break;
                case 'tag':
                    // Handle tag selection
                    break;
                case 'user':
                    // Handle user selection
                    break;
            }
        }
    }



    return (
        <div>
            <Select
                placeholder="Search..."
                radius="md"
                leftSection={<FiSearch />}
                miw={{ base: "auto", sm: 300 }}
                display={{ base: "none", sm: "block" }}
                data={searchOptions}
                onSearchChange={setSearchValue}
                searchValue={searchValue}
                searchable
                clearable
                nothingFoundMessage="No results found"
                onChange={(selectedValue, option) => {
                    handleSelect(selectedValue, option);
                }}
                rightSection={loading ? <Loader size="xs" /> : null}

            />
        </div>
    )
}

export default Search