const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

let doctors = [
    {
        id: '1',
        insId: ['1', '4'],
        doctorName: 'Dr. Otto Octavius',
        city: 'Schenectady',
        specialty: 'Biotechnology',
        // insuranceAccepted: 'SquidMed'
    },
    {
        id: '2',
        insId: ['2', '3', '4'],
        doctorName: 'Dr. Walter Jackson Freeman II',
        city: 'Washington, D.C.',
        specialty: 'Neurology',
        // insuranceAccepted: 'Transorbital'
    },
    {
        id: '3',
        insId: ['3', '4'],
        doctorName: 'Dr. Jack Kevorkian',
        city: 'Pontiac',
        specialty: 'Pathology',
        // insuranceAccepted: 'MuertAssist United'
    }
];

let plans = [
    // For each insurance plan, the 'docId' must correspond to
    // the 'id' of the doctor that takes that insurance.

    // Try to find a way to let each insurance take an array
    // of 'docId's.. Otherwise, you will have to make
    // hundreds of objects for each insurance plan, with 
    // different 'docId's.. Which frankly.. Sucks. And
    // is bad.
    {
        id: '1',
        docId: ['1'],
        insName: 'SquidMed',
        usualCoPay: '$100'
    },
    {
        id: '2',
        docId: ['2'],
        insName: 'Transorbital',
        usualCoPay: '$25'
    },
    {
        id: '3',
        docId: ['2', '3'],
        insName: 'MuertAssist',
        usualCoPay: '$666'
    },
    {
        id: '4',
        docId: ['1', '2', '3'],
        insName: 'United',
        usualCoPay: '$30'
    }
]

// DoctorType sets up the schema for our provider. A model
// for what data the doctor carries. The types must be
// GraphQLString because... That's just how GraphQL
// works. shrug.
// GraphQLObjectType defines that it's an object.

// Wrapping the 'fields' in a function prevents the code from
// trying to execute, before the entirety of the file is
// run. 
const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: { type: GraphQLID },
        doctorName: { type: GraphQLString },
        city: { type: GraphQLString },
        specialty: { type: GraphQLString },
        insuranceAccepted: {
            type: new GraphQLList(InsuranceType),
            resolve(parent, args) {
                return _.filter(plans, { docId: [parent.id] })
                // return plans.filter(item =>  {
                //     console.log(item)
                //     return item.docId.some(docId => {
                //         console.log(docId, parent.id)
                //         return docId === parent.id
                //     })
                // })
            }
        }
    })
});

const InsuranceType = new GraphQLObjectType({
    name: 'Insurance',
    fields: () => ({
        id: { type: GraphQLID },
        insName: { type: GraphQLString },
        usualCoPay: { type: GraphQLString },
        doctorsAccepting: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                return _.filter(doctors, { insId: [parent.id] })
            //     return doctors.filter(item => {
            //         console.log(item)
            //         return item.insId.some(insId => {
            //             console.log(insId, parent.id)
            //             return insId === parent.id
            //         })
            //     })
            }
        }
    })
    // add a doctors field and filter through
});

// The root query defines how we will be querying the Dr.
// and insurance to get the object's data.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        doctor: {
            type: DoctorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // Code to get data from DB or other source
                // console.log(typeof (args.id))
                return _.find(doctors, { id: args.id });
            }
        },
        insurance: {
            type: InsuranceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(insurance, { id: args.id });
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                return doctors
            }
        },
        plans: {
            type: new GraphQLList(InsuranceType),
            resolve(parent, args) {
                return plans
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});