import { PrimaryButton } from 'UI/Buttons/PrimaryButton';

export function EditUserProfileForm({ userFormData, onChangeHandler, onSubmitHandler, onCancelHandler }) {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userFormData.firstName}
                    onChange={onChangeHandler}
                    required={true}
                />
            </div>

            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userFormData.lastName}
                    onChange={onChangeHandler}
                    required={true}
                />
            </div>

            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userFormData.phoneNumber}
                    onChange={onChangeHandler}
                    required={true}
                />
            </div>

            <div>
                <PrimaryButton type="submit" name="Update" />
                <PrimaryButton onClick={onCancelHandler} name="Cancel" />
            </div>
        </form>
    );
};