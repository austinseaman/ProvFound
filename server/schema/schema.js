const graphql = require('graphql');
const _ = require('lodash');
const Doctor = require('../models/doctor');
const Plan = require('../models/plan')

const { GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

// let doctors = [
//     {
//         id: '1',
//         insId: ['1', '4'],
//         doctorName: 'Dr. Otto Octavius',
//         city: 'Schenectady',
//         specialty: 'Biotechnology'
//     },
//     {
//         id: '2',
//         insId: ['2', '3', '4'],
//         doctorName: 'Dr. Walter Jackson Freeman II',
//         city: 'Washington, D.C.',
//         specialty: 'Neurology'
//     },
//     {
//         id: '3',
//         insId: ['3', '4'],
//         doctorName: 'Dr. Jack Kevorkian',
//         city: 'Pontiac',
//         specialty: 'Pathology'
//     }
// ];

// let plans = [
//     // For each insurance plan, the 'docId' must correspond to
//     // the 'id' of the doctor that takes that insurance.
//     {
//         id: '1',
//         docId: ['1'],
//         insName: 'SquidMed',
//         usualCoPay: '$100'
//     },
//     {
//         id: '2',
//         docId: ['2'],
//         insName: 'Transorbital',
//         usualCoPay: '$25'
//     },
//     {
//         id: '3',
//         docId: ['2', '3'],
//         insName: 'MuertAssist',
//         usualCoPay: '$666'
//     },
//     {
//         id: '4',
//         docId: ['1', '2', '3'],
//         insName: 'United',
//         usualCoPay: '$30'
//     }
// ]

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
                // return _.filter(plans, { docId: [parent.id] })
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
                // return _.filter(doctors, { insId: [parent.id] })
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
                // return _.find(doctors, { id: args.id });
            }
        },
        insurance: {
            type: InsuranceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(insurance, { id: args.id });
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve(parent, args) {
                // return doctors
            }
        },
        plans: {
            type: new GraphQLList(InsuranceType),
            resolve(parent, args) {
                // return plans
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDoctor: {
            type: DoctorType,
            args: {
                doctorName: { type: GraphQLString },
                city: { type: GraphQLString },
                specialty: { type: GraphQLString }
            },
            resolve(parent, args){
                let doctor = new Doctor({
                    doctorName: args.doctorName,
                    city: args.city,
                    specialty: args.specialty
                });
                return doctor.save();
            }
        },
        addPlan: {
            type: InsuranceType,
            args: {
                insName: { type: GraphQLString },
                usualCoPay: { type: GraphQLString },
                docId: { type: GraphQLID }
            },
            resolve(parent, args){
                let plan = new Plan({
                    insName: args.insName,
                    usualCoPay: args.usualCoPay,
                    docId: args.docId
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});