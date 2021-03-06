function getDate() {
    return new Date().toISOString();
}

function getDateForPostge(dateString) {
    let d = dateString || getDate();
    return d.split('T').join(' ').slice(0);
}

function generateLeggingsProduct(id, name, category_id, color, size, design, material, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if (category_id === '1041') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name.trim()}`,
            "product_hash": `|cid:1118|type:SPECIFICATION-3:${color.trim()}-339:${material.trim()}-133:${design.trim()}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1010"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1118"
            },
            "templates": [
                {
                    "name": "Units of Measure",
                    "is_default": false,
                    "type": "UOM",
                    "attributes": [
                        {
                            "name": "Pack Size", "unit": "Pieces", "unit_for_price_calculation": "Pieces", "use_for_price_calculation": true,
                            "value": packsize
                        }
                    ]
                },
                {
                    "name": "Specification",
                    "is_default": false, "type": "SPECIFICATION", "attributes": [
                        { "value":`${material}`,"mandatory": false, "name": "Material", "type": "basic", "qc_enabled": false, "value_options": ["CTN_LCR", "Rayon"], "active": true, "id": 10, "data_type": "list_of_strings", "unit_id": null }, 
                        { "value":`${color}`,"mandatory": true, "name": "Color", "type": "basic", "qc_enabled": false, "value_options": ["RED", "TEAL", "Navy", "Fuchsia", "Beige", "White", "Black", "Mustard", "Maroon", "Blue", "Green", "Rust", "Royal Blue", "Red", "Teal"], "active": true, "id": 3, "data_type": "list_of_strings", "unit_id": null }, 
                        { "value":`${size}`,"mandatory": true, "name": "Size", "type": "basic", "qc_enabled": false, "value_options": ["S", "M", "L", "XL", "XXL"], "active": true, "id": 339, "data_type": "list_of_strings", "unit_id": null }, 
                        { "value":`${design}`,"mandatory": true, "name": "Design Code", "type": "basic", "qc_enabled": false, "value_options": [], "active": true, "id": 133, "data_type": "free_text", "unit_id": null },
                        {
                            "active": true,
                            "data_type": "number",
                            "id": 863,
                            "mandatory": false,
                            "name": "MRP",
                            "qc_enabled": false,
                            "type": "basic",
                            "unit_id": null,
                            "value_options": [],
                            "value": parseFloat(mrp)
                        }
                    ]
                }
            ],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "4"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Abhay Kumar Muni",
                "id": 34007,
                "email": "abhay@bizongo.com"
            }
        };
    } else return null;
}


function generateSliderProduct(id, name, category_id, material, type, design, mrp, pack_size) {

    let packsize = pack_size ? parseInt(pack_size) : 1;

    if (category_id === '1010') {

        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name.trim()}`,
            "product_hash": `|cid:1053|type:SPECIFICATION-9:${type.trim()}-10:${material.trim()}-855:${design.trim()}-863:${mrp}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1010"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1053"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": true,
                    "name": "Material",
                    "qc_enabled": true,
                    "type": "basic",
                    "value_options": ["PVC", "EVA", "STRAP"],
                    "value": `${material.trim()}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 9,
                    "mandatory": true,
                    "name": "Type",
                    "qc_enabled": true,
                    "type": "basic",
                    "value_options": ["Slipper", "Clogs", "Shoes", "Sandals", "Slipon", "Lace-Up", "Flip Flops"],
                    "value": `${type.trim()}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 855,
                    "mandatory": false,
                    "name": "Design",
                    "qc_enabled": true,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design.trim()}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": [],
                    "value": parseFloat(mrp)
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "5"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Abhay Kumar Muni",
                "id": 34007,
                "email": "abhay@bizongo.com"
            }
        }
    }
    else return null;
}

function mensTopwear(id, name, category_id, material, color, size, design, brand, style, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if (category_id === '1052') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name.trim()}`,
            "product_hash": `|cid:1184|type:SPECIFICATION-3:${color.trim()}-133:${design.trim()}-339:${size.trim()}-863:${mrp}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1052"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1208"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": ["Cotton", "100%Cotton"],
                    "value": `${material}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": ["AF BLUE", "Aqua Blue", "ASH", "Beige", "BEIGE", "BISCUIT", "Black", "BLACK", "Blue", "BLUE", "Brick Orange", "Brown", "BROWN", "Carbon Black", "Charcoal", "CHARCOL", "Coral", "Cream", "CREAM", "Dark Blue", "Dark Grey", "DARK GREY", "DARK NEVY", "DARK PINK", "DARK SALMON", "DARK TINT", "Deep Olive", "Deep Red", "DS", "DUSTY ROSE", "FAWN", "Flourescent Green", "Green", "GREEN", "GREY", "Grey", "HUNTER", "ICE", "Indigo", "INK BLUE", "KHAKHI", "KHAKI", "Lemon", "LEMON", "Light Blue", "Light Brown", "Light Green", "LIGHT GREEN", "LIGHT GREY", "LIGHT INDIGO", "Light Olive", "LIGHT PISTA", "LIGHT SALMON", "LIGHT YELLOW\t", "Lime", "MAROON", "MEHNDI", "Mehndi Green", "Melange Grey", "Mid Blue", "MINT", "mix", "Multicolor", "MUSTARD", "NAVY", "Navy Blue", "NAVY BLUE", "Neon Blue", "Neon Orange", "NEON PINK", "Neon Yellow", "Olive", "Orange", "PEACH", "PERIWINKLE", "PHONE", "PINK", "PISTA", "Pista Green", "RAMA GREEN", "RED", "Royal Blue", "Rust", "RUST", "Sea Green", "SEA GREEN", "Silver", "SKY", "Sky Blue", "SKY BLUE", "STONE", "STONE GREEN", "T. BLUE", "Teal", "TQ", "Turquoise", "White", "WHITE", "Yellow", "YELLOW"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": ["36", "38", "40", "42", "44", "3XL", "M", "XL", "XXL", "L","S"],
                    "value": `${size}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": [],
                    "value": `${design}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": [],
                    "value": parseFloat(mrp)
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 4,
                    "mandatory": false,
                    "name": "Brand Name",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": ["ARCHER", "OC MEN", "ONE CENTRE", "SUPER DP", "SUPER DP JUNIOR", "Y-RAL", "JOE POLLEN"],
                    "value": `${brand}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 884,
                    "mandatory": false,
                    "name": "Style Number",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": [],
                    "value": `${style}`
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "13"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Mukesh Shetty",
                "id": 34593,
                "email": "mukesh.shetty@bizongo.com"
            },
            "updated_by": {
                "name": "Mukesh Shetty",
                "id": 34593,
                "email": "mukesh.shetty@bizongo.com"
            }
        }
    } else return null;
}

function generateTopsAndTunicsProduct(id, name, category_id, size, design, color, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;
    // console.log(typeof category_id, category_id)
    if (category_id === '1047') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name.trim()}`,
            "product_hash": `|cid:1170|type:SPECIFICATION-3:${color.trim()}-133:${design.trim()}-339:${size.trim()}-863:${mrp}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1047"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1210"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["S", "M", "L", "XS", "XL", "XXL", "XXXL", "3XL", "24", "26", "28", "30", "32", "34", "36", "38", "40"],
                    "value": `${size.trim()}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design.trim()}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Green", "Navy", "Peach", "Red", "White", "Wine", "Yellow", "Mustard", "Pink", "Grey", "Blue", "Magenta", "Maroon", "Light Green", "Teal", "Fuchsia", "Light Blue", "Mehndi Green", "Rust", "Aqua Blue", "Light Olive", "Dark Grey", "Coral", "Lime Green", "Bottle Green", "Mint Green", "Pastel Green", "Light Pink", "BLACK", "Black", "BLUE", "BOTTLE GREEN", "CELADON", "CREAM", "DARK BLUE", "DARK GREY", "DARK PEACH", "DREAM BLUE", "GREEN", "GREY", "IVORY", "LEMON", "LIGHT BLUE", "LIGHT GREEN", "LIGHT GREY", "LIGHT PEACH", "MAROON", "MELANGE", "MELANGE GREY", "MULTI", "MUSTARD", "NAVY", "NAVY BLUE", "OLIVE", "PEACH", "PINK", "PISTA", "PURPLE", "RED", "ROSE", "ROYAL BLUE", "STEEL BLUE", "VIOLET", "WHITE", "YELLOW"],
                    "value": `${color.trim()}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "unit_id": null,
                    "value_options": [],
                    "value": parseFloat(mrp)
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "13"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        }
    }
    else return null;
}

function generateDenimsProduct(id, name, category_id, color, design, fabric, size, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;

    if (category_id === '1048')
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1117|type:SPECIFICATION-3:${color}-133:${design}-339:28-861:${fabric}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1048"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1117"
            },
            "templates": [
                {
                    "name":"Units of Measure","is_default":false,"type":"UOM",
                    "attributes":[
                        {"value": `${packsize}`,"name":"Pack Size","unit":"Pieces","unit_for_price_calculation":"Pieces","use_for_price_calculation":true}
                    ]
                },
                {
                    "name":"Specification","is_default":false,"type":"SPECIFICATION",
                    "attributes":[
                        {"value": `${color}`,"mandatory":true,"name":"Color","type":"basic","qc_enabled":false,"value_options":["Black","Charcoal","Beige","Brown","Khakee","Navy","Olive","Silver","Royal Blue","Sky Blue","mix","MULTI","Indigo","Dark Grey","Mid Blue"],"active":true,"id":3,"data_type":"list_of_strings","unit_id":null},
                        {"value": `${size}`,"mandatory":true,"name":"Size","type":"basic","qc_enabled":false,"value_options":["28","30","32","34","36","38","40","42","44","26"],"active":true,"id":339,"data_type":"list_of_strings","unit_id":null},
                        {"value": `${fabric}`,"mandatory":true,"name":"Fabric - Dobby","type":"basic","qc_enabled":false,"value_options":["Cotton Dobby","Dobby Checks","Cotton Yarn Dye","Cotton Knit","Satin","Satin Check","Satin Print","Satin with 5% Poly","Jeans","Denims","Dobby Poly","Heavy Knits","Twill","Cotton Knit with 5% poly","Dobby"],"active":true,"id":861,"data_type":"list_of_strings","unit_id":null},
                        {"value": `${design}`,"mandatory":true,"name":"Design Code","type":"basic","qc_enabled":false,"value_options":[],"active":true,"id":133,"data_type":"free_text","unit_id":null},{"mandatory":true,"name":"Material","type":"basic","qc_enabled":false,"value_options":["Cotton","Cotton Dobby","Dobby Checks","Cotton Yarn Dye","Cotton Knit","Satin","Satin Check","Satin Print","Satin with 5% Poly","Jeans","Denims","Heavy Knits","Twill","Cotton Knit with 5% poly","Dobby","Dobby Poly"],"active":true,"id":10,"data_type":"list_of_strings","unit_id":null},
                        {"value": `${mrp}`,"mandatory":true,"name":"MRP","type":"basic","qc_enabled":false,"value_options":[],"active":true,"id":863,"data_type":"number","unit_id":null}
                    ]
                }
            ]
            ,
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "17"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        }

    else return null;
}

function generateSunglassesProducts(id, name, design, brand, color, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;

    if (category_id === '1044') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1033|type:SPECIFICATION-133:${design}-4:${brand}-3:${color}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1044"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1033"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": 1
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 4,
                    "mandatory": false,
                    "name": "Brand Name",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Vinus", "Dhingra"],
                    "value": `${brand}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": false,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Mix"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": false,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["M"]
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 721,
                    "mandatory": false,
                    "name": "Description",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": []
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "3"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "2"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Abbas Dawood",
                "id": 34155,
                "email": "abbas.dawood@bizongo.com"
            }
        };
    } else return null;

}

function generateBeautyProducts(id, name, category_id, volume, weight, design, brand, type, description, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;

    if (category_id === '316') {
        // version 6, template id: 1076
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1076|type:SPECIFICATION-4:${brand}-9:${type}-15:${volume}-133:${design}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "316"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1076"
            },
            "templates": [{
                "name": "Specifications",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 9,
                    "mandatory": true,
                    "name": "Type",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Aloe Vera Gel", "Moisturizer", "Mani-Pedi Pack", "Cleansing Milk", "Wax", "Pre Wax Gel", "Post Wax Gel", "Astringent", "Rose Water", "Body Powder", "Dusting Powder", "Nail Polish Remover", "Nail Paint", "Hair Oil", "De-tan Pack", "Body Bleach", "Facial Pack", "Cleanup Pack", "Massage Cream", "Wax Cartridge", "Antiseptic Liquid", "Mani Pedi Salt", "Cocowhite Fairness Cream", "Almondfine Anti Ageing Cream", "Papayaclean Anti Blemish Cream", "Carrotshield Anti-Pollution Day Cream", "Marinight Night Cream", "Neempure Anti Acne & Pimple Cream", "Aloepure Aloevera & Basil Face Wash", "Teatree Fresh Skin Toner", "COCOA HONEY MOISTURISING LOTION", "Grapemoist Moisturising Lotion", "Phytogain Hair Oil", "Phytogain Hair Vitalizer", "Turmericlean Cleansing Lotion", "Basilclean Cleansing Lotion", "Glopure Fairness Face Wash", "Aprifresh Apricot Scrub", "Neemclean Antidandruff Shampoo", "Heenashine Conditioning Shampoo", "Amlacare Hairfall Control Shampoo", "Rosemoist Winter Care Cream", "Henna Hair Pack", "Papayaclean Anti Blemish Face Wash", "Glopure Anti Tan Scrub", "Neempure Anti Acne & Pimple Face Wash", "Papayaclean Anti Blemishes Face Pack", "Almondfine Anti Ageing Face Pack", "Neempure Anti Acne & Pimple Face Pack", "Glopure Fairness Face Pack", "Antidandruff Lotion", "Smoother Hair Serum", "Hairfall Control Serum", "Ice Cream Stick", "UVShield Mattifying Sun Block Cream SPF 40", "UVShield Sun Block Cream SPF 30", "UVShield Sunscreen Fairness Lotion SPF 25", "UVShield Sun Block Gel SPF 20", "Aprifine Apricot Cream for Under Eye Dark Circle", "Neempure Anti Acne & Pimple Gel", "Almondfine Anti Wrinkle Gel", "Papaya clean Anti Blemishes Gel", "Glopure Fairness Gel", "Gold Facial Kit", "Platinum Facial Kit", "Pearl Facial Kit", "Diamond Facial Kit", "Phytonight Night Cream", "Phytolight Day Cream", "Mystic Sindoor(Liquid)Red", "Mystic Sindoor(Liquid)Maroon", "Strawberry Lip Therapy", "Cherry Lip Therapy", "Papaya clean Anti Blemishes Serum", "Neem pure Anti Acne & Pimple Serum", "Glopure Fairness Serum", "Almond fine Anti Ageing Serum", "Phytowash Luxury Facewash", "Sheasoft Fairness Nourishing Body Milk", "Sheasoft Day Long Nourishing Body Milk", "Papaya Facial Kit", "Avoshine Hair Conditioner", "Fruit mix Facial Kit", "Sheasoft Honey & Saffron Body Lotion", "Sheasoft Intensive Body Lotion", "UV Shield Sun Block Formula SPF 50", "Phytowash Aqua Marine Luxury Bodywash", "Phytowash Silk Touch Luxury Bodywash", "Phytoage Age Reversal Cr??me", "Mesmeric Eye Defining Kajal", "Cocoa Butter Body Butter", "Strawberry Body Butter", "Papaya clean Body Butter", "Glopure Body Butter", "Orange Lip Therapy", "Hair Butter Spa", "BB Cream 001 Ivory Fair", "UV Shield Mattifying Gel Cream SPF 45 PA+++", "UV Shield Sunscreen Face Wash Gel", "UV Shield Sun Block Spray SPF 40", "Activated Charcoal Face Scrub", "Activated Charcoal Face Wash", "Bamboo Charcoal Peel Off Mask", "BB Cream 002 Beige Medium", "BB Cream 003 Bronze Dark", "Nail Enamel 01 Berry Dark", "Nail Enamel 03 Noosy Golden", "Nail Enamel 04 Purple Blaze", "Nail Enamel 05 Magic Moment", "Nail Enamel 06 Cloud Puff", "Nail Enamel 07 Apple Velvet", "Nail Enamel 08 Seed Crush", "Nail Enamel 09 Love Splash", "Nail Enamel 10 Peach Mart", "Nail Enamel 11 Gold Teaser", "Nail Enamel 12 Gold Fever", "Nail Enamel 13 Titanic Purple", "Nail Enamel 14 Titanic Blue", "Nail Enamel 02 Red Rose", "Nail Enamel 15 MuddIn", "Nail Enamel 20 Chocolate Tan", "Nail Enamel 21 Garden Green", "Nail Enamel 22 Blue Touch", "Nail Enamel 23 Passion Street", "Nail Enamel 25 Pink Shimmer", "Nail Enamel 26 Shine Mania", "Nail Enamel 27 Ash Grey", "Nail Enamel 28 Candle Green", "Nail Enamel 29 Navy Blue", "Nail Enamel 30 Black Panther", "Nail Enamel 31 Clear Coat", "Nail Enamel 32 Dusky Mauve", "Nail Enamel 33 Yellow Millow", "Nail Enamel 34 Tan Flash", "Nail Enamel 35 Love It", "Nail Enamel 36 Fall In Love", "Nail Enamel 19 Mudd Out", "Nail Enamel 18 Blue Peace", "Nail Enamel 17 Silver Diamond", "Nail Enamel 16 Deep Root", "Mesmeric Liquid Eye Liner", "Mesmeric Long Lash Mascara", "Phytogain Hair Serum", "Papaya clean Anti Blemish Foaming Face Wash", "Nail Enamel Remover", "Nail Enamel 37 Mad Mermaid", "Nail Enamel 38 Urban Jungle", "Nail Enamel 39 Sunset Love", "Nail Enamel 40 Women For President", "Nail Enamel 41 Hi-Clectic Couture", "Nail Enamel 42 Pearly Magic", "Nail Enamel 43 Holy Guacamoly", "Nail Enamel 44 Universe", "Nail Enamel 45 Shiny Silver", "Nail Enamel 46 Sparkle Pink", "Nail Enamel 47 Sun Gold", "Nail Enamel 48 Sparkle Red", "Nail Enamel 49 FRIENDS FOREVER", "Nail Enamel 51 RED RED WINE", "Nail Enamel 54 PINK BUNNY", "Nail Enamel 55 RED AFFAIRS", "Nail Enamel 56 BRAZILIAN", "Nail Enamel 57 GALAXY", "Nail Enamel 59 RAINBOW", "Nail Enamel 60 SWEEDISH STAR", "Whitening Facial Kit", "Tightening Facial Kit", "Brightening Facial Kit", "Glowing Facial Kit", "Frankincenese Pure Essential Oil", "Bergamot Pure Essential Oil", "Vetiver Pure Essential Oil", "Eucalyptus Pure Essential Oil", "Patchouli Pure Essential Oil", "Rosemarry Pure Essential Oil", "Lavender Pure Essential Oil", "Lemongrass Pure Essential Oil", "Ylang Ylang Pure Essential Oil", "Teatree Pure Essential Oil", "Radiance D-Tan Face Wash", "Radiance D-Tan Face Pack", "Radiance D-Tan Face Scrub", "Charcoal Cleansing Bar", "Papaya clean Cleansing Bar", "BB Cream 000 Light Warm", "Rose Fresh Wipes", "Tea Tree Wipes", "Papaya Clean Wipes", "Rose Fresh Handwash", "Oshea herbals Sanitizer Gel Based", "Oshea herbals Sanitizer Gel & Alcohol based", "GOLD MASSAGE CREAM", "WHEAT CARE CREAM", "GOLD MASSAGE GEL", "PLATINUM ENERGIZING CREAM", "PLATINUM MOISTURISING CREAM", "PLATINUM MASK", "PLATINUM SCRUB", "DIAMOND ENERGIZING CREAM", "DIAMOND MOISTURISING CREAM", "DIAMOND MASK", "DIAMOND SCRUB", "PEARL ENERGIZING CREAM", "PEARL MOISTURISING CREAM", "PEARL MASK", "PEARL SCRUB", "PAPAYA CREAM", "HAND CLEANSER", "LOUIS HAND CLEANSER", "Nail Enamel 24 Miss Maroon", "Nail Enamel 50 URBANZ", "Nail Enamel 52 MATCH THE MACHOS", "Nail Enamel 53 LOV PHUSIA", "Nail Enamel 58 STAR'S OF GALAXY", "Radiance D Tan Fairness Body Massage Oil", "NEEM INSTANT HAND CLEANSER-DRYNESS & HYDRATES SKIN(NON ALCOHOLIC)", "Tea tree Handwash", "Oshea herbals Sanitizer Alcohol based", "NAIL ENAMEL-TAKLA TURQUOISE", "NAIL ENAMEL-BLINK OF PINKY", "NAIL ENAMEL - CANDLELIGHT DINNER", "NAIL ENAMEL - JAM OF PLUM", "NAIL ENAMEL - GALAXY STAR", "NAIL ENAMEL - PEACHY", "NAIL ENAMEL - SHINE OF DIVINE", "NAIL ENAMEL - DUST OF COPPER", "NAIL ENAMEL - BADGE", "NAIL ENAMEL - GREY GOOSE", "NAIL ENAMEL - LONDON BLUES", "NAIL ENAMEL - NUDE PINKS", "NEEMPURE FACEPACK", "ALMONDFINE FACEPACK", "PAPAYACLEAN FACEPACK", "GLOPURE FACEPACK", "GLOPURE SCRUB", "GOLD PACK", "GOLD GEL SCRUB", "GRAPEMOIST MOISTURING LOTION 500ML"],
                    "value": `${type}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 18,
                    "mandatory": false,
                    "name": "Weight",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": null,
                    "unit_id": 3,
                    "value": parseFloat(weight)
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 721,
                    "mandatory": false,
                    "name": "Description",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": null,
                    "value": `${description}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 15,
                    "mandatory": false,
                    "name": "Volume",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": null,
                    "value": parseFloat(volume),
                    "unit_id": 2
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 4,
                    "mandatory": true,
                    "name": "Brand Name",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Sage Apothecary", "NA", "VLCC", "Olivia Herbal", "Raaga", "UC Branded", "Colorbar", "Nivea", "Candid", "Richelon", "Sleek", "Multibrand", "Waxxo", "Ola Candy", "H&F", "Oshea"],
                    "value": `${brand}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": false,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }]
            }, {
                "name": "Units of Measurement",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "6"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Nikhil Bharadwaj",
                "id": 34379,
                "email": "nikhil.bharadwaj@bizongo.com"
            },
            "updated_by": {
                "name": "Abhay Kumar Muni",
                "id": 34007,
                "email": "abhay@bizongo.com"
            }
        };

    } else return null;

}

function generateKidsTopwear(id, name, category_id, color, size, design, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;
    // console.log(typeof category_id, category_id)
    if (category_id === '1050') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1163|type:SPECIFICATION-3:${color}-133:${design}-339:${size}-863:${mrp}|type:UOM-Pack Size:1-Pieces|`,
            "category_id": {
                "$numberLong": "1050"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1197"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Baby Pink", "Black", "Dark Grey", "Ecru Melange", "Fuchsia", "Green", "Grey", "Grey Melange", "Indigo", "Lemon", "LightGreen", "LIGHTYELLOW", "Mauve", "Mint", "Mix Color", "Multi", "Navy", "OffWhite", "Peach", "Pink", "PISTA", "Pista Green", "Purple", "RED", "Sea Green", "SKY", "Sky Blue", "Turquoise", "White", "Yellow"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["6-12M", "12-18M", "18-24M", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y", "14-15Y", "16Y", "38", "40", "42", "44", "0-6M", "2", "4", "6", "8", "10", "12", "14", "16"],
                    "value": `${size}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Cotton", "100%Cotton"]
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": parseFloat(mrp)
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "7"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        }
    } else return null;
}

function generateKidsBottomwear(id, name, category_id, color, size, design, mrp, pack_size) {
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if (category_id === '1051') {
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1091|type:SPECIFICATION-3:${color.trim()}-133:${design.trim()}-339:${size.trim()}-863:${mrp}|type:UOM-Pack Size:1-Pieces|`,
            "category_id": {
                "$numberLong": `${category_id}`
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1091"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Cotton", "100%Cotton"]
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Mint", "RED", "Sky Blue", "Lemon", "Pink", "White", "Peach", "LightGreen", "Baby Pink", "OffWhite", "Ecru Melange", "Navy", "Mustard"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["6-12M", "12-18M", "18-24M", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y", "14-15Y", "16Y", "38", "40", "42", "44"],
                    "value": `${size}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value": parseFloat(mrp)
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "3"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        }
    } else return null;
}

function generateMensBottomWear(id, name, category_id, color, size, design, mrp, pack_size){
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if(category_id === '1065'){
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:
            |type:SPECIFICATION-3:${color}-133:${design}-339:${size}-863:${mrp}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1065"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1201"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": 1
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Cotton"]
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["S", "M", "L", "XL", "XXL"],
                    "value": `${size}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["AF BLUE", "Aqua Blue", "ASH", "BEIGE", "BISCUIT", "Black", "Blue", "Brick Orange", "Brown", "Carbon Black", "Charcoal", "CHARCOL", "Coral", "CREAM", "Dark Blue", "DARK GREY", "DARK NEVY", "DARK PINK", "DARK SALMON", "DARK TINT", "Deep Olive", "Deep Red", "Denim", "DUSTY ROSE", "Ecru", "Ecru Melange", "FAWN", "Flourescent Green", "Gold", "Green", "Grey", "HUNTER", "ICE", "ICEBLUE", "Indigo", "INK BLUE", "IVORY", "KHAKHI", "KHAKI", "LEMON", "Light Blue", "Light Brown", "Light Green", "LIGHT GREY", "LIGHT INDIGO", "Light Olive", "LIGHT PISTA", "LIGHT SALMON", "LIGHT YELLOW", "LIGHTGREY", "Lime", "Maroon", "MEHNDI", "Mehndi Green", "Melange Grey", "Mid Blue", "MINT", "mix", "MULTICOLOR", "Mustard", "Navy", "NAVY BLUE", "NAVYBLUE", "Neon Blue", "Neon Orange", "NEON PINK", "Neon Yellow", "Olive", "Orange", "Peach", "PEACOCKGREEN", "PEACOCKGREY", "PERIWINKLE", "PHONE", "Pink", "PISTA", "Pista Green", "Purple", "RAMA GREEN", "RED", "Royal Blue", "Rust", "Sea Green", "Silver", "SKY", "Sky Blue", "SKYBLUE", "STONE", "STONE GREEN", "T. BLUE", "Teal", "TQ", "White", "Yellow"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": parseFloat(mrp)
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "3"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        };

    } else return null;
}

function generateunisextoys(id, name, category_id, age, design, mrp, pack_size){
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if(category_id === '1063'){
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:
            |type:SPECIFICATION-133:${design}-863:${mrp}-866:${age}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1063"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1070"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": `${pack_size}`
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Plastic"]
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 866,
                    "mandatory": true,
                    "name": "Age(Years)",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["4-7"],
                    "value": `${age}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": parseFloat(mrp)
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "1"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        };

    } else return null;
}

function generateNightWear(id, name, category_id, color, size, design, mrp, pack_size){
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if(category_id === '1095'){
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:1146|type:SPECIFICATION-3:${color}-133:${design}-339:${size}-863:${mrp}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1095"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1146"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": 1
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": true,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["S", "M", "L", "XL", "XXL"],
                    "value": `${size}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": true,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Yellow","Pink","Sky Blue"],
                    "value": `${color}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": true,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": parseFloat(mrp)
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design}`
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "2"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        };

    } else return null;
}

function generateGenericProduct(id, name, category_id, modelNumber, type, pack_size){
    let packsize = pack_size ? parseInt(pack_size) : 1;

    let uom = '';

    let category_template_id = 1144;
    let version = 3;

    switch(category_id){
        case '1094': uom = 'Pieces'; category_template_id = 1144; version = 3; break;
        case '1097': uom = 'Kilograms'; category_template_id = 1154; version = 1; break;
        case '1098': uom = 'Meters'; category_template_id = 1159; version = 1; break;
    }

    if(category_id === '1094' || category_id === '1097' || category_id === '1098'){
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name}`,
            "product_hash": `|cid:${category_template_id}|type:SPECIFICATION-312:${modelNumber}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1094"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": `${category_template_id}`
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": `${uom}`,
                    "unit_for_price_calculation": `${uom}`,
                    "use_for_price_calculation": true,
                    "value": 1
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 9,
                    "mandatory": false,
                    "name": "Type",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Pen"],
                    "value":`${type}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": false,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["White", "Black", "Green", "Yellow", "Silver", "Orange", "Natural", "Brown"]
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 4,
                    "mandatory": false,
                    "name": "Brand Name",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["Non Branded"]
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 1,
                    "mandatory": false,
                    "name": "Length",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 1
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 5,
                    "mandatory": false,
                    "name": "Width",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 1
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 19,
                    "mandatory": false,
                    "name": "Height",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 1
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 138,
                    "mandatory": false,
                    "name": "Inner Diameter",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 1
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 105,
                    "mandatory": false,
                    "name": "Outer Diameter",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 1
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 15,
                    "mandatory": false,
                    "name": "Volume",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 2
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 18,
                    "mandatory": false,
                    "name": "Weight",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "unit_id": 3
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 312,
                    "mandatory": true,
                    "name": "Item model number",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${modelNumber}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 10,
                    "mandatory": false,
                    "name": "Material",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["PP"]
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": false,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["M", "L", "S", "XXL", "Standard", "Any", "Small", "Medium", "Large", "Others", "Free Size", "Subject to availability", "Customized", "Large Square", "Small Square", "38", "40", "42", "44", "32-36", "XXXL", "26"]
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 302,
                    "mandatory": false,
                    "name": "Voltage",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": []
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 875,
                    "mandatory": false,
                    "name": "Power Rating",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": []
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": `${version}`
            },
            "pack_size": {
                "unit": `${uom}`,
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Mukesh Singh",
                "id": 34241,
                "email": "mukesh.singh@bizongo.com"
            },
            "updated_by": {
                "name": "Ishan Purohit",
                "id": 34114,
                "email": "ishan.purohit@bizongo.com"
            }
        };
    } else return null;
}

function generateLadiesNightWear(id, name, category_id, color, size, design, mrp, pack_size){
    let packsize = pack_size ? parseInt(pack_size) : 1;
    if(category_id === '1096'){
        return {
            "_id": {
                "$numberLong": `${id}`
            },
            "name": `${name.trim()}`,
            "product_hash": `|cid:1166|type:SPECIFICATION-133:${design.trim()}|type:UOM-Pack Size:${packsize}-Pieces|`,
            "category_id": {
                "$numberLong": "1096"
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "category_template_id": {
                "$numberLong": "1209"
            },
            "templates": [{
                "name": "Units of Measure",
                "is_default": false,
                "type": "UOM",
                "attributes": [{
                    "name": "Pack Size",
                    "unit": "Pieces",
                    "unit_for_price_calculation": "Pieces",
                    "use_for_price_calculation": true,
                    "value": packsize
                }]
            }, {
                "name": "Specification",
                "is_default": false,
                "type": "SPECIFICATION",
                "attributes": [{
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 339,
                    "mandatory": false,
                    "name": "Size",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["S", "M", "L", "XXL", "XL", "F", "24", "26", "28", "30", "32", "34", "36", "40", "3XL"],
                    "value": `${size.trim()}`
                }, {
                    "active": true,
                    "data_type": "free_text",
                    "id": 133,
                    "mandatory": true,
                    "name": "Design Code",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": `${design.trim()}`
                }, {
                    "active": true,
                    "data_type": "list_of_strings",
                    "id": 3,
                    "mandatory": false,
                    "name": "Color",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": ["MULTI", "Mix Color", "Black", "Mustard", "Navy", "Olive", "Mid Blue", "White", "Grey", "Yellow", "Pink", "BLUE", "BOTTLE GREEN", "CELADON", "CREAM", "DARK BLUE", "BLACK", "DARK GREY", "DARK PEACH", "DREAM BLUE", "GREEN", "GREY", "IVORY", "LEMON", "LIGHT BLUE", "LIGHT GREEN", "LIGHT GREY", "LIGHT PEACH", "MAROON", "MELANGE", "MELANGE GREY", "MUSTARD", "NAVY", "NAVY BLUE", "OLIVE", "PEACH", "PINK", "PISTA", "PURPLE", "RED", "ROSE", "ROYAL BLUE", "STEEL BLUE", "VIOLET", "WHITE", "YELLOW"],
                    "value": `${color.trim()}`
                }, {
                    "active": true,
                    "data_type": "number",
                    "id": 863,
                    "mandatory": false,
                    "name": "MRP",
                    "qc_enabled": false,
                    "type": "basic",
                    "value_options": [],
                    "value": parseFloat(mrp)
                }]
            }],
            "is_combo": false,
            "is_ppe": false,
            "sku_type": "direct",
            "sku_code": `BZ-SKU-0${id}`,
            "category_template_version": {
                "$numberLong": "4"
            },
            "pack_size": {
                "unit": "Pieces",
                "name": "pack size",
                "value": {
                    "$numberLong": `${packsize}`
                }
            },
            "status": "approved",
            "product_update_status": "update_not_required",
            "version": {
                "$numberLong": "1"
            },
            "created_at": {
                "$date": getDate()
            },
            "updated_at": {
                "$date": getDate()
            },
            "created_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            },
            "updated_by": {
                "name": "Sonali Patil",
                "id": 34593,
                "email": "sonali.patil@bizongo.com"
            }
        };
    } else return null;
}

module.exports = {
    generateSliderProduct: generateSliderProduct,
    generateSunglassesProducts: generateSunglassesProducts,
    generateTopsAndTunicsProduct: generateTopsAndTunicsProduct,
    generateDenimsProduct: generateDenimsProduct,
    mensTopwear: mensTopwear,
    generateBeautyProducts: generateBeautyProducts,
    generateKidsTopwear: generateKidsTopwear,
    generateKidsBottomwear: generateKidsBottomwear,
    getDate: getDate,
    getDateForPostge: getDateForPostge,
    generateLeggingsProduct: generateLeggingsProduct,
    generateMensBottomWear: generateMensBottomWear,
    generateNightWear: generateNightWear,
    generateGenericProduct: generateGenericProduct,
    generateLadiesNightWear: generateLadiesNightWear,
    generateunisextoys: generateunisextoys
};