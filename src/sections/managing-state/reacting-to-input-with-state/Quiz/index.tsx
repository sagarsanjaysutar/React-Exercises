import React, { FC, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Input, Form } from 'antd';
import Header from '@/components/header/header';

/**
 * @brief Reacting to Input with State & Choosing the State Structure.
 * @ref https://react.dev/learn/choosing-the-state-structure
 * @ref https://react.dev/learn/reacting-to-input-with-state
 */
const QuizContainer: FC = () => {
    // By not making a state for fullName (which can be calculated using existing states),
    // we have avoided making a redundant state.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullName = firstName + ' ' + lastName;
    const verifyName = (fullName: string) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                fullName.match(/[^a-zA-Z\s]/g) ? reject() : resolve();
            }, 1500);
        });
    };

    // We've grouped related states together.
    type Contact = { email: string; phone: string };
    const [contactInfo, setContactInfo] = useState<Contact>({
        email: '',
        phone: '',
    });

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setContactInfo({
            email: '',
            phone: '',
        });
    };

    // By not making flags for each status, e.g. isSuccess, isError, etc. we have avoided
    // contradictory state where isSuccess & isError may accidentally become true.
    type FormStatus = 'submitting' | 'success' | 'error' | 'typing';
    const [formStatus, setFormStatus] = useState<FormStatus>('typing');
    const handleSubmit: FormProps['onFinish'] = async () => {
        setFormStatus('submitting');
        try {
            await verifyName(fullName);
            setFormStatus('success');
        } catch {
            setFormStatus('error');
        }
        resetForm();
    };
    const buttonsDisabled = formStatus == 'submitting' || firstName.length == 0;

    return (
        <div className="">
            <Header>
                Reacting to Input with State & <br /> Choosing the State Structure
            </Header>

            <p className="text-slate-200 text-xl py-2">Please fill in your info</p>

            <Form
                onFinish={handleSubmit}
                style={{
                    display: 'grid',
                    gap: '5px',
                    gridTemplateColumns: `repeat(2, 1fr)`,
                }}
            >
                <Input
                    type="text"
                    disabled={formStatus == 'submitting'}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(value) => setFirstName(value.target.value)}
                />
                <Input
                    type="text"
                    disabled={formStatus == 'submitting'}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(value) => setLastName(value.target.value)}
                />
                <Input
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
                <Input
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

                <Button
                    variant="filled"
                    className={buttonsDisabled ? '!bg-gray-200' : ''}
                    disabled={buttonsDisabled}
                    onClick={resetForm}
                >
                    Reset
                </Button>
                <Button
                    variant="filled"
                    className={buttonsDisabled ? '!bg-blue-200' : '!bg-blue-600'}
                    disabled={buttonsDisabled}
                    htmlType="submit"
                    type="text"
                >
                    Submit
                </Button>

                {formStatus == 'success' && (
                    <p className="text-base text-slate-200"> Full Name is {fullName} </p>
                )}
                {formStatus == 'error' && <p style={{ color: 'red' }}> Error! </p>}
            </Form>
        </div>
    );
};

export default QuizContainer;
