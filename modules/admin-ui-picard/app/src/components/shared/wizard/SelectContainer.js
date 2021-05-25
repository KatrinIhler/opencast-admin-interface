import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import cn from "classnames";
import {useField} from "formik";

/**
 * This component renders the select container used for roles and user pages in new group and new user pages.
 */
const SelectContainer = ({ resource, formikField }) => {
    const { t } = useTranslation();

    // Formik hook for getting data of specific form field
    // DON'T delete field and meta, hook works with indices not variable names
    const [field, meta, helpers] = useField(formikField);

    // Search field for filter options/items
    const [searchField, setSearchField] = useState('');
    const [defaultItems, setDefaultItems] = useState([]);
    // arrays an item can be part of depending on its state
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(field.value);
    const [markedForAddition, setMarkedForAddition] = useState([]);
    const [markedForRemoval, setMarkedForRemoval] = useState([]);

    let initialItems = resource.items;

    useEffect(() => {
        // Makes sure that options user already chosen are only shown in right select
        // when coming back again from other page
        // no field value yet --> skip for loop and use all provided items for left
        if (selectedItems.length > 0) {
            for (let i = 0; i < selectedItems.length; i++) {
                remove(selectedItems[i].name, initialItems);
            }
        }

        setItems(initialItems);
        setDefaultItems(initialItems);
    }, []);


    const clearSearchField = () => {
        setSearchField('');
        setItems(defaultItems);
    };

    const handleChangeSearch = async input => {
        const filtered = defaultItems.filter(item => {
            return item.name.toLowerCase().includes(input.toLowerCase());
        });
        setSearchField(input);
        setItems(filtered);

    };

    const handleChangeAdd = e => {
        let options = e.target.options;
        let selectedOptions = [];

        // put marked options in array
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }

        // set currently chosen options
        setMarkedForAddition(selectedOptions);
    };

    const handleChangeRemove= e => {
        let options = e.target.options;
        let deselectedOptions = [];

        // put all marked options in array
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                deselectedOptions.push(options[i].value);
            }
        }

        // mark currently marked options for removal
        setMarkedForRemoval(deselectedOptions);
    };

    const handleClickAdd = () => {
        let editableItems = items;
        let editableSelectedItems = selectedItems;
        let editableDefaultItems = defaultItems;

        // move marked items to selected items
        for (let i = 0; i < markedForAddition.length; i++) {
            move(markedForAddition[i], editableItems, editableSelectedItems);

            // remove marked item from items considered for search bar
            remove(markedForAddition[i], editableDefaultItems);
        }

        // update state with current values
        setSelectedItems(editableSelectedItems);
        setItems(editableItems);
        setMarkedForAddition([]);
        // update items considered for search bar
        setDefaultItems(editableDefaultItems);
        //update formik field
        helpers.setValue(selectedItems);


    };

    const handleClickRemove = () => {
        let editableItems = items;
        let editableSelectedItems = selectedItems;
        let editableDefaultItems = defaultItems;

        // move marked items from selected items back to items
        for (let i = 0; i < markedForRemoval.length; i++) {
            move(markedForRemoval[i], editableSelectedItems, editableItems);

            // add marked item to items considered for search bar if not already containing
            if (!editableDefaultItems.some(item => item.name === markedForRemoval[i])) {
                editableDefaultItems.push({name: markedForRemoval[i]});
            }
        }

        // update state with current values
        setSelectedItems(editableSelectedItems);
        setItems(editableItems);
        setMarkedForRemoval([]);
        // update items considered for search bar
        setDefaultItems(editableDefaultItems);
        // update formik field
        helpers.setValue(selectedItems);

    };

    // move item from one array to another when matching key
    const move = (key, from, to) => {
        for (let i = 0; i < from.length; i++) {
            if (from[i].name === key) {
                to.push(from[i]);
                from.splice(i, 1);
                return;
            }
        }
    };

    // remove item from array when matching key
    const remove = (key, compare) => {
        for (let i = 0; i < compare.length; i++) {
            if (compare[i].name === key) {
                compare.splice(i, 1);
                return;
            }
        }
    }

    return (
        <div className="row">
            <div className="multi-select-container offset-col-2">
                <div className="multi-select-col">
                    <div className="row">
                        <label>{t(resource.label + '.LEFT')}<i className="required"/></label>
                        {/*Search*/}
                        {resource.searchable && (
                            <>
                                {/* search bar */}
                                <a className="clear" onClick={() => clearSearchField()}/>
                                <input type="text"
                                       id="search"
                                       className="search"
                                       placeholder={t('TABLE_FILTERS.PLACEHOLDER')}
                                       onChange={e => handleChangeSearch(e.target.value)}
                                       value={searchField}/>
                            </>

                        )}
                        {/*Select with options provided by backend*/}
                        <select multiple
                                className="available"
                                style={{minHeight: '11em'}}
                                value={markedForAddition}
                                onChange={e => handleChangeAdd(e)}>
                            {items.map((item, key) => (
                                <option key={key} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">
                        <div className="button-container">
                            <button className={cn("submit", {disabled: !markedForAddition.length})}
                                    onClick={() => handleClickAdd()}>
                                {t(resource.label + '.ADD')}
                            </button>
                        </div>
                    </div>
                </div>


                <div className="exchange-icon"/>

                {/*Select with options chosen by user*/}
                <div className="multi-select-col">
                    <div className="row">
                        <label>{t(resource.label + '.RIGHT')}</label>
                        <select multiple
                                className="selected"
                                style={{minHeight: '11em'}}
                                onChange={e => handleChangeRemove(e)}
                                value={markedForRemoval}>
                            {selectedItems.map((item, key) => (
                                <option key={key} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">
                        <div className="button-container">
                            <button className={cn("remove", {disabled: !markedForRemoval.length})}
                                    onClick={() => handleClickRemove()}>
                                {t(resource.label + '.REMOVE')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectContainer;