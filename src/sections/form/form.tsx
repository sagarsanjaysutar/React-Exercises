import React, { FC, FormEvent, useState } from 'react';
import style from './form.module.css';

/**
 * @brief Practices to follow while working with react states.
 * @ref https://react.dev/learn/choosing-the-state-structure
 */
const Form: FC = () => {
    // By not making a state for fullName (which can be calculated using existing states),
    // we have avoided making a redundant state.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullName = firstName + ' ' + lastName;

    // By not making flags for each status, e.g. isSuccess, isError, etc. we have avoided
    // contradictory state where isSuccess & isError may accidentally become true.
    type FormStatus = 'submitting' | 'success' | 'error' | 'typing';
    const [formStatus, setFormStatus] = useState<FormStatus>('typing');

    // We've grouped related states together.
    type Contact = { email: string; phone: string };
    const [contactInfo, setContactInfo] = useState<Contact>({
        email: '',
        phone: '',
    });

    const verifyName = (fullName: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                fullName.match(/[^a-zA-Z]/g) ? reject() : resolve();
            }, 1500);
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormStatus('submitting');
        try {
            await verifyName(fullName);
            setFormStatus('success');
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-slate-600 p-5">
            <h2 className="text-lg">Quiz</h2>
            <div className={style.container}>
                <p>Please fill in your info.</p>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'grid',
                        gap: '5px',
                        gridTemplateColumns: `repeat(2, 1fr)`,
                    }}
                >
                    <input
                        type="text"
                        disabled={formStatus == 'submitting'}
                        placeholder="First Name"
                        value={firstName}
                        onChange={(value) => setFirstName(value.target.value)}
                    />
                    <input
                        type="text"
                        disabled={formStatus == 'submitting'}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(value) => setLastName(value.target.value)}
                    />
                    <input
                        type="text"
                        disabled={formStatus == 'submitting'}
                        placeholder="Email"
                        value={contactInfo?.email}
                        onChange={(value) =>
                            setContactInfo({
                                ...contactInfo,
                                email: value.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        disabled={formStatus == 'submitting'}
                        placeholder="Phone"
                        value={contactInfo?.phone}
                        onChange={(value) =>
                            setContactInfo({
                                ...contactInfo,
                                phone: value.target.value,
                            })
                        }
                    />
                    <button
                        type="submit"
                        style={{ gridColumn: `span 2` }}
                        disabled={
                            formStatus == 'submitting' || firstName.length == 0
                        }
                    >
                        Submit
                    </button>

                    {formStatus == 'success' && (
                        <p style={{ color: 'green' }}>
                            {' '}
                            Full Name is {fullName}{' '}
                        </p>
                    )}
                    {formStatus == 'error' && (
                        <p style={{ color: 'red' }}> Error! </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Form;
