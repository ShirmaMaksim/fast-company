import React, { useState, useEffect } from "react";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import _ from "lodash";
import SearchString from "../../ui/searchString";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";

const UsersListPage = () => {
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchStringValue, setSearchString] = useState("");

    const { users } = useUser();
    const { professions } = useProfessions();

    const handleSearchStringChange = ({ target }) => {
        const { value } = target;
        setSearchString(value);
        handleClearFilter();
    };
    const handleDelete = (id) => {
        // setUsers((prevState) => prevState.filter((user) => user._id !== id));
        console.log(id);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((item) => {
            if (item._id === id) {
                return { ...item, bookmark: !item.bookmark };
            }
            return item;
        });
        console.log(newArray);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = item => {
        setSearchString("");
        setSelectedProf(item);
    };
    const handleSort = item => {
        setSortBy(item);
    };
    const handleClearFilter = () => {
        setSelectedProf();
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    if (users) {
        const filteredUsers = searchStringValue
            ? (users.filter(user => user.name.includes(searchStringValue)))
            : (selectedProf ? users.filter(user => Object.keys(user.profession).every(key => user.profession[key] === selectedProf[key])) : users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="container">
                <div className="d-flex">
                    { professions &&
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={ selectedProf }
                                items={ professions }
                                onItemSelect={ handleProfessionSelect }
                            />
                            <button className="btn btn-secondary m-2" onClick={ handleClearFilter }>Очистить</button>
                        </div>
                    }
                    <div className="d-flex flex-column">
                        <SearchStatus number={count} />
                        <SearchString value={ searchStringValue } onChange={ handleSearchStringChange } />
                        { count !== 0 &&
                            <UsersTable
                                users={ userCrop }
                                onSort={ handleSort }
                                selectedSort={ sortBy }
                                onDelete={ handleDelete }
                                onToggleBookMark={ handleToggleBookMark }
                            />
                        }
                        { filteredUsers.length > pageSize &&
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={ count }
                                    pageSize={ pageSize }
                                    currentPage={ currentPage }
                                    onPageChange={ handlePageChange }
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>loading...</div>
    );
};

export default UsersListPage;
