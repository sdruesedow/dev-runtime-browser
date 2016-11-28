/**
 * Created by Senan Sharhan on 23.08.2016.
 */

function seeding(){


    let fname = 'senan';
    let lname = 'sharhan';
    let GUID = 12345678;

    window.runtime.runtime.addContact(GUID, fname, lname);


    let fname2 = 'Ishan';
    let lname2 = 'Tiwari';
    let GUID2 = 123456781;


    window.runtime.runtime.addContact(GUID2, fname2, lname2);


    let fname3 = 'Felix';
    let lname3 = 'Beierle';
    let GUID3 = 123456782;


    window.runtime.runtime.addContact(GUID3, fname3, lname3);

    getAllContacts();

    window.runtime.runtime.generateGUID();

    window.runtime.runtime.setOwnerName('OwnerFirstNameJohn', 'OwnerLastNameKennedy');
    window.runtime.runtime.setDefaults('1', '0','0');
    window.runtime.runtime.getOwner();

};

