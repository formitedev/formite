export enum Gender {
    Female = "FEMALE",
    Male = "MALE"
}

export type AddressType = {
    city: string;
    country: string;
};

export type FriendType = {
    firstName: string;
    lastName: string;
};

export type SampleType = {
    gender: Gender;
    firstName: string;
    lastName: string;
    newsletter: boolean;
    invoiceAddress: AddressType;
    shippingAddress: AddressType;
    friends: FriendType[];
};

export function createSampleValues(): SampleType {
    return {
        gender: Gender.Male,
        firstName: "Peter",
        lastName: "Smith",
        newsletter: true,
        invoiceAddress: {
            city: "New York",
            country: "USA"
        },
        shippingAddress: {
            city: "Newark",
            country: "USA"
        },
        friends: [
            {
                firstName: "Sahrah",
                lastName: "Johnson"
            },
            {
                firstName: "George",
                lastName: "Miller"
            }
        ]
    };
}

const SampleValues = createSampleValues();

export { SampleValues };
