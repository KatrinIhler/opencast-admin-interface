import React, {useState} from "react";
import {Formik} from "formik";
import {initialFormValuesNewGroup} from "../../../../configs/wizardConfig";
import {NewGroupSchema} from "../../../shared/wizard/validate";
import WizardStepper from "../../../shared/wizard/WizardStepper";
import NewGroupMetadataPage from "./NewGroupMetadataPage";
import NewGroupRolesPage from "./NewGroupRolesPage";
import NewGroupUsersPage from "./NewGroupUsersPage";
import NewGroupSummaryPage from "./NewGroupSummaryPage";
import {postNewGroup} from "../../../../thunks/groupThunks";

/**
 * This component renders the new group wizard
 */
const NewGroupWizard = ({ close }) => {

    const initialValues = initialFormValuesNewGroup;

    const [page, setPage] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);

    // Caption of steps used by Stepper
    const steps = [
        {
            translation: 'USERS.GROUPS.DETAILS.TABS.METADATA',
            name: 'metadata'
        }, {
            translation: 'USERS.GROUPS.DETAILS.TABS.ROLES',
            name: 'roles'
        }, {
            translation: 'USERS.GROUPS.DETAILS.TABS.USERS',
            name: 'users'
        }, {
            translation: 'USERS.GROUPS.DETAILS.TABS.SUMMARY',
            name: 'summary'
        }
    ];

    // Validation schema of current page
    const currentValidationSchema = NewGroupSchema[page];

    const nextPage = values => {
        setSnapshot(values);
        setPage(page + 1);
    };

    const previousPage = values => {
        setSnapshot(values);
        setPage(page - 1);
    };

    const handleSubmit = values => {
        const response = postNewGroup(values);
        close();
    }

    return (
        <>
            {/* Stepper that shows each step of wizard as header */}
            <WizardStepper steps={steps} page={page}/>

            {/* Initialize overall form */}
            <Formik initialValues={snapshot}
                    validationSchema={currentValidationSchema}
                    onSubmit={values => handleSubmit(values)}>
                {/* Render wizard pages depending on current value of page variable */}
                {formik => (
                    <div>
                        {page === 0 && (
                            <NewGroupMetadataPage formik={formik}
                                                  nextPage={nextPage}/>
                        )}
                        {page === 1 && (
                            <NewGroupRolesPage formik={formik}
                                               nextPage={nextPage}
                                               previousPage={previousPage}/>
                        )}
                        {page === 2 && (
                            <NewGroupUsersPage formik={formik}
                                               nextPage={nextPage}
                                               previousPage={previousPage}/>
                        )}
                        {page === 3 && (
                            <NewGroupSummaryPage formik={formik}
                                                 previousPage={previousPage}/>
                        )}
                    </div>
                )}
            </Formik>
        </>
    )
};

export default NewGroupWizard;