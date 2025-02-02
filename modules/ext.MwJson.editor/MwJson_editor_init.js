/*@nomin*/

var schema = {
    "title": "TestTemplate",
    "template": "TestTemplate",
    "type": "object",
    "id": "form",
    "properties": {
        "building": {
            "title": "Gebäude",
            "type": "string",
            "description": "reference (autocomplete)",
            "format": "autocomplete",
            "options": {
                "autocomplete": {
                    "search": "search_smw",
                    "getResultValue": "getResultValue_smw",
                    "renderResult": "renderResult_smw",
                    "onSubmit": "onSubmit_smw",
                    "autoSelect": "true"
                }
            },
            "query": "[[Category:LIMS/Location/Building]]|?-IsLocatedIn|?HasName|?HasImage",
            "displayProperty": "HasName",
            "renderProperty": "-IsLocatedIn",
            "renderLabel": "Stockwerke:",
            "previewWikiTextTemplate": "{{#if result.printouts.HasImage.0.fulltext}}[[{{result.printouts.HasImage.0.fulltext}}|right|x66px]]</br>{{/if}}This is a building: [[{{result.fulltext}}]]. Levels: \\{\\{#ask: [[IsLocatedIn::{{result.fulltext}}]]|format=list\\}\\}",
            "default": ""
        },
        "level": {
            "title": "Stockwerk",
            "type": "string",
            "description": "reference (autocomplete)",
            "format": "autocomplete",
            "options": {
                "autocomplete": {
                    "search": "search_smw",
                    "getResultValue": "getResultValue_smw",
                    "renderResult": "renderResult_smw",
                    "onSubmit": "onSubmit_smw",
                    "autoSelect": "true"
                }
            },
            "query": "[[Category:LIMS/Location/Floor]][[IsLocatedIn::$(building)]]|?-IsLocatedIn|?HasImage",
            "watch": {
                "building": "building"
            },
            "renderProperty": "-IsLocatedIn",
            "renderLabel": "Räume:",
            "previewWikiTextTemplate": "{{#if result.printouts.HasImage.0.fulltext}}[[{{result.printouts.HasImage.0.fulltext}}|right|x66px]]</br>{{/if}}This is a building level: [[{{result.fulltext}}]]. Rooms: \\{\\{#ask: [[IsLocatedIn::{{result.fulltext}}]]|format=list\\}\\}",
            "default": ""
        },
        "room": {
            "title": "Raum",
            "type": "string",
            "default": "",
            "format": "autocomplete",
            "options": {
                "autocomplete": {
                    "search": "search_smw",
                    "getResultValue": "getResultValue_smw",
                    "renderResult": "renderResult_smw",
                    "onSubmit": "onSubmit_smw",
                    "autoSelect": "true"
                }
            },
            "query": "[[Category:LIMS/Location/Room]][[IsLocatedIn::$(level)]]|?HasName|?HasImage",
            "watch": {
                "level": "level"
            },
            "renderProperty": "HasName",
            "renderLabel": "Name:",
            "previewWikiTextTemplate": "{{#if result.printouts.HasImage.0.fulltext}}[[{{result.printouts.HasImage.0.fulltext}}|right|x66px]]</br>{{/if}}This is a room: [[{{result.fulltext}}]]. Function: \\{\\{#ask: [[{{result.fulltext}}]]|?HasRoomFunction|format=list\\}\\}",
            "default": ""
        }
    }
}

var schema2 = {
    "title": "Lab Process",
    "type": "object",
    "id": "process",
    "properties": {
        "staticText0010": { "type": "string", "format": "markdown", "options": { "hidden": true }, "default": "<noinclude>\n" },
        "header": {
            "title": "General Data",
            "type": "object",
            "id": "header",
            "properties": {
                "_template": {
                    "type": "string",
                    "default": "OslTemplate:LabProcess/Header",
                    "options": {
                        "hidden": true,
                    }
                },
                "id": {
                    "title": "ID",
                    "type": "string",
                    "description": "Short local ID"
                },
                "name": {
                    "title": "Name",
                    "type": "string",
                    "description": "Human readable name"
                },
                /*"creation_data": {
                    'type': 'string',
                    'format': 'datetime-local',
                    //template': 'now',
                    //'format': 'flatpickr'
                },*/
                "output_category": {
                    "title": "Output category",
                    "type": "string",
                    "description": "Category/Class of the primary process output",
                    "format": "autocomplete",
                    "query": "[[IsASubcategoryOf::Category:Thing]] OR [[IsASubcategoryOf.IsASubcategoryOf::Category:Thing]]|?Display_title_of=label",
                    "labelTemplate": "{{#if result.printouts.label.length}}{{result.printouts.label}}{{else if result.displaytitle}}{{result.displaytitle}}{{else}}{{result.fulltext}}{{/if}}",
                    "previewWikiTextTemplate": "[[:{{result.fulltext}}]]",
                    "default": ""
                },
                "output_type": {
                    "title": "Output type",
                    "type": "string",
                    "description": "Type of the primary process output",
                    "format": "autocomplete",
                    "query": "[[$(category)]]",
                    "watch": {
                        "category": "output_category"
                    },
                    "default": ""
                },
                "parameters": {
                    "title": "Parameters",
                    "type": "array",
                    "format": "table",
                    "id": "parameters",
                    "items": {
                        "title": "Parameter",
                        "headerTemplate": "{{i}} - {{self.name}}",
                        "id": "parameter",
                        "properties": {
                            "_template": {
                                "type": "string",
                                "default": "#invoke:LabProcess/Parameter/Config|quantitative",
                                "options": {
                                    "hidden": true,
                                }
                            },
                            "id": {
                                "title": "ID",
                                "type": "string",
                                "description": "Short local ID",
                                "default": "P0000",
                                "options": {
                                    "imask": {
                                        "returnUnmasked": true,
                                        "mask": "{P}0000",
                                        "lazy": false,
                                        "placeholderChar": "#"
                                    }
                                }
                            },
                            "name": {
                                "title": "Name",
                                "type": "string",
                                "description": "Human readable name"
                            },
                            "property": {
                                "title": "Property",
                                "type": "string",
                                "format": "autocomplete",
                                "query": "[[Category:QuantityProperty]]|?HasDescription",
                                "previewWikiTextTemplate": "[[{{result.fulltext}}]]<br/>{{result.printouts.HasDescription}}",
                            },
                            "nominal_value": {
                                "title": "Nominal Value",
                                "type": "number",
                                "format": "number",
                                "step": 0.1
                            },
                            "actual_value": {
                                "title": "Actual Value",
                                "type": "number",
                                "format": "number",
                                "step": 0.1
                            },
                            "unit": {
                                "title": "Unit",
                                "type": "string",
                                "format": "autocomplete",
                                "query": "[[$(property)]]|?HasInputUnitSymbol",
                                "listProperty": "HasInputUnitSymbol",
                                "previewWikiTextTemplate": "{{result}}",
                                "labelTemplate": "{{result}}",
                                "watch": {
                                    "property": "parameter.property"
                                }
                            }
                        }
                    }
                }
            }
        },
        "staticText0020": {
            "type": "string", "format": "markdown", "options": { "hidden": true }, "default": `
</noinclude>
<includeonly>
{{OslTemplate:LabProcess/Instance/Header
  |id={{{id|}}}
  |name=Drying Protocol
  |output_category={{{output_category}}}
  |output_type={{{output_type}}}
  |type_symbol={{{type_symbol}}}
  |creator_abbreviation={{{creator_abbreviation}}}
  |creator={{{creator}}}
  |short_timestamp={{{short_timestamp}}}
  |timestamp={{{timestamp}}}
  |projects={{{projects}}}
  |additional_ids={{{additional_ids}}}
  |template={{{template}}}
  |debug={{OslTemplate:Helper/Strings/No}}
}}
</includeonly>
`
        },
        "objects": {
            "title": "Objects",
            "type": "array",
            "format": "tabs",
            "id": "objects",
            "items": {
                "title": "Object",
                "headerTemplate": "{{i}} - {{self.name}}",
                "id": "object",
                "properties": {
                    "_template": {
                        "type": "string",
                        "default": "#invoke:LabProcess/Object|object",
                        "options": {
                            "hidden": true,
                        }
                    },
                    "id": {
                        "title": "ID",
                        "type": "string",
                        "description": "Short local ID",
                        "default": "O0010",
                        "imask": {
                            "returnUnmasked": true,
                            "mask": "{O}0000",
                            "lazy": false,
                            "placeholderChar": "#"
                        }
                    },
                    "name": {
                        "title": "Name",
                        "type": "string",
                        "description": "Human readable name"
                    },
                    "category": {
                        "title": "Category",
                        "type": "string",
                        "description": "Category/Class of the primary process output",
                        "format": "autocomplete",
                        "query": "[[IsASubcategoryOf::Category:Thing]] OR [[IsASubcategoryOf.IsASubcategoryOf::Category:Thing]]|?Display_title_of=label",
                        "previewWikiTextTemplate": "[[:{{result.fulltext}}]]",
                        "default": ""
                    },
                    "type": {
                        "title": "Type",
                        "type": "string",
                        "description": "Type of the primary process output",
                        "format": "autocomplete",
                        "query": "[[$(category)]]",
                        "watch": {
                            "category": "object.category"
                        },
                        "default": ""
                    },
                    "count": {
                        "title": "Count",
                        "oneOf": [
                            {
                                "title": "Constant",
                                "type": "integer",
                                "format": "number",
                                "description": "Number of similar objects/batch members",
                                "default": 1
                            },
                            {
                                "title": "Parameter",
                                "type": "string",
                                "description": "Number of similar objects/batch members",
                                "watch": {
                                    "parameters": "process.header.parameters"
                                },
                                "enumSource": [
                                    {
                                        "source": "parameters",
                                        "title": "{{item.name}}",
                                        "value": "{{item.id}}"
                                    }
                                ]
                            }
                        ]
                    },
                    "global": {
                        "title": "Global",
                        "type": "boolean",
                        "format": "checkbox",
                        "default": false,
                        "description": "Object is global visible and reuseable"
                    }
                }
            }

        },
        "steps": {
            "title": "Process Steps",
            "type": "array",
            "format": "tabs",
            "id": "steps",
            "items": {
                "title": "Step",
                "headerTemplate": "{{i}} - {{self.name}}",
                "options": {
                    "keep_oneof_values": false
                },
                "oneOf": [
                    {
                        "title": "None",
                        "type": "object",
                        "required": [
                            "file_type"
                        ],
                        "properties": {
                            "file_type": {
                                "title": "File type",
                                "type": "string",
                                "enum": ["None"]
                            }
                        }
                    },
                    {
                        "title": "Generic",
                        "template": "OslTemplate:LabProcess/Steps/Generic",
                        "type": "object",
                        "id": "step",
                        "properties": {
                            "_template": {
                                "type": "string",
                                "default": "OslTemplate:LabProcess/Steps/Generic",
                                "options": {
                                    "hidden": true,
                                }
                            },
                            "id": {
                                "title": "ID",
                                "type": "string",
                                "description": "Short local ID",
                                "default": "S0010",
                                "imask": {
                                    "returnUnmasked": true,
                                    "mask": "{S}0000",
                                    "lazy": false,
                                    "placeholderChar": "#"
                                }
                            },
                            "name": {
                                "title": "Name",
                                "type": "string",
                                "description": "Human readable name"
                            },
                            "predecessor": {
                                "title": "Predecessor",
                                "type": "string",
                                "format": "selectize",
                                "description": "Previous step",
                                "watch": {
                                    "steps": "process.steps"
                                },
                                "enumSource": [
                                    [""],
                                    {
                                        "source": "steps",
                                        "title": "{{item.name}}",
                                        "value": "{{item.id}}",
                                        "filter": "{{#when item.id '!==' self.id}}1{{/when}}"
                                    }
                                ]

                            },
                            "input_objects": {
                                "title": "Input Objects",
                                "type": "array",
                                "format": "table",
                                "id": "input_objects",
                                "items": {
                                    "title": "Input Object",
                                    "properties": {
                                        "id": {
                                            "type": "string",
                                            "title": "Object Reference",
                                            "description": "Short local ID",
                                            "watch": {
                                                "objects": "process.objects"
                                            },
                                            "enumSource": [
                                                [""],
                                                {
                                                    "source": "objects",
                                                    "title": "{{item.name}}",
                                                    "value": "{{item.id}}"
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            "output_objects": {
                                "title": "Output Objects",
                                "type": "array",
                                "format": "table",
                                "id": "output_objects",
                                "items": {
                                    "title": "Output Object",
                                    "properties": {
                                        "id": {
                                            "type": "string",
                                            "title": "Object Reference",
                                            "description": "Short local ID",
                                            "watch": {
                                                "objects": "process.objects"
                                            },
                                            "enumSource": [
                                                [""],
                                                {
                                                    "source": "objects",
                                                    "title": "{{item.name}}",
                                                    "value": "{{item.id}}"
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            "tools": {
                                "title": "Used Devices and Software Tools",
                                "type": "array",
                                "format": "table",
                                "id": "tools",
                                "items": {
                                    "title": "Tool/Device",
                                    "headerTemplate": "{{i}} - {{self.name}}",
                                    "id": "tool",
                                    "properties": {
                                        "_template": {
                                            "type": "string",
                                            "default": "#invoke:LabProcess/Parameter/Config|tool",
                                            "options": {
                                                "hidden": true,
                                            }
                                        },
                                        "id": {
                                            "title": "ID",
                                            "type": "string",
                                            "default": "P0000",
                                            "options": {
                                                "imask": {
                                                    "returnUnmasked": true,
                                                    "mask": "{P}0000",
                                                    "lazy": false,
                                                    "placeholderChar": "#"
                                                }
                                            }
                                        },
                                        "index_offset": {
                                            "type": "integer",
                                            "format": "number"
                                        },
                                        "name": {
                                            "title": "Name",
                                            "type": "string",
                                        },
                                        "nominal_category": {
                                            "title": "Category (Nominal)",
                                            "type": "string",
                                            //"description": "Category/Class of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[IsASubcategoryOf::Category:Tool]] OR [[IsASubcategoryOf.IsASubcategoryOf::Category:Tool]] OR [[IsASubcategoryOf.IsASubcategoryOf.IsASubcategoryOf::Category:Tool]] |?Display_title_of=label",
                                            "previewWikiTextTemplate": "[[:{{result.fulltext}}]]",
                                            "default": ""
                                        },
                                        "nominal_type": {
                                            "title": "Type (Nominal)",
                                            "type": "string",
                                            //"description": "Type of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[$(category)]]",
                                            "watch": {
                                                "category": "tool.nominal_category"
                                            },
                                            "default": ""
                                        },
                                        "nominal_instance": {
                                            "title": "Instance (Nominal)",
                                            "type": "string",
                                            //"description": "Instance of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[IsInstanceOf::$(type)]]",
                                            "watch": {
                                                "type": "tool.nominal_type"
                                            },
                                            "default": ""
                                        }
                                    }
                                }
                            },
                            "objects": {
                                "title": "Used Materials/Parts",
                                "type": "array",
                                "format": "table",
                                "id": "objects",
                                "items": {
                                    "title": "Materials/Parts",
                                    "headerTemplate": "{{i}} - {{self.name}}",
                                    "id": "object",
                                    "properties": {
                                        "_template": {
                                            "type": "string",
                                            "default": "#invoke:LabProcess/Parameter/Config|object",
                                            "options": {
                                                "hidden": true,
                                            }
                                        },
                                        "id": {
                                            "title": "ID",
                                            "type": "string",
                                            "default": "P0000",
                                            "options": {
                                                "imask": {
                                                    "returnUnmasked": true,
                                                    "mask": "{P}0000",
                                                    "lazy": false,
                                                    "placeholderChar": "#"
                                                }
                                            }
                                        },
                                        "index_offset": {
                                            "type": "integer",
                                            "format": "number"
                                        },
                                        "name": {
                                            "title": "Name",
                                            "type": "string",
                                        },
                                        "object_id": {
                                            "title": "Object Reference",
                                            "type": "string",
                                            "watch": {
                                                "objects": "process.objects"
                                            },
                                            "enumSource": [
                                                [""],
                                                {
                                                    "source": "objects",
                                                    "title": "{{item.name}}",
                                                    "value": "{{item.id}}"
                                                }
                                            ]
                                        },
                                        "nominal_category": {
                                            "title": "Category (Nominal)",
                                            "type": "string",
                                            //"description": "Category/Class of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[IsASubcategoryOf::Category:Material]] OR [[IsASubcategoryOf.IsASubcategoryOf::Category:Material]] OR [[IsASubcategoryOf.IsASubcategoryOf.IsASubcategoryOf::Category:Material]] |?Display_title_of=label",
                                            "previewWikiTextTemplate": "[[:{{result.fulltext}}]]",
                                            "default": ""
                                        },
                                        "nominal_type": {
                                            "title": "Type (Nominal)",
                                            "type": "string",
                                            //"description": "Type of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[$(category)]]",
                                            "watch": {
                                                "category": "object.nominal_category"
                                            },
                                            "default": ""
                                        },
                                        "nominal_instance": {
                                            "title": "Instance (Nominal)",
                                            "type": "string",
                                            //"description": "Instance of the tool/device",
                                            "format": "autocomplete",
                                            "query": "[[IsInstanceOf::$(type)]]",
                                            "watch": {
                                                "type": "object.nominal_type"
                                            },
                                            "default": ""
                                        }
                                    }
                                }
                            },
                            "quantitatives": {
                                "title": "Quantitative Parameters",
                                "type": "array",
                                "format": "table",
                                "id": "quantitatives",
                                "items": {
                                    "title": "Quantitative Parameter",
                                    "headerTemplate": "{{i}} - {{self.name}}",
                                    "id": "parameter",
                                    "properties": {
                                        "_template": {
                                            "type": "string",
                                            "default": "#invoke:LabProcess/Parameter/Config|quantitative",
                                            "options": {
                                                "hidden": true,
                                            }
                                        },
                                        "id": {
                                            "title": "ID",
                                            "type": "string",
                                            "default": "P0000",
                                            "options": {
                                                "imask": {
                                                    "returnUnmasked": true,
                                                    "mask": "{P}0000",
                                                    "lazy": false,
                                                    "placeholderChar": "#"
                                                }
                                            }
                                        },
                                        "index_offset": {
                                            "type": "integer",
                                            "format": "number"
                                        },
                                        "name": {
                                            "title": "Name",
                                            "type": "string",
                                        },
                                        "object_id": {
                                            "title": "Object Reference",
                                            "type": "string",
                                            "watch": {
                                                "objects": "process.objects"
                                            },
                                            "enumSource": [
                                                [""],
                                                {
                                                    "source": "objects",
                                                    "title": "{{item.name}}",
                                                    "value": "{{item.id}}"
                                                }
                                            ]
                                        },
                                        "nominal_quantity": {
                                            "title": "Property",
                                            "type": "string",
                                            "format": "autocomplete",
                                            "query": "[[Category:QuantityProperty]]|?HasDescription",
                                            "previewWikiTextTemplate": "[[{{result.fulltext}}]]<br/>{{result.printouts.HasDescription}}",
                                        },
                                        "nominal_value": {
                                            "title": "Nominal Value",
                                            "type": "number",
                                            "format": "number",
                                            "step": 0.1
                                        },
                                        "actual_value": {
                                            "title": "Actual Value",
                                            "type": "number",
                                            "format": "number",
                                            "step": 0.1
                                        },
                                        "nominal_unit": {
                                            "title": "Unit",
                                            "type": "string",
                                            "format": "autocomplete",
                                            "query": "[[$(property)]]|?HasInputUnitSymbol",
                                            "listProperty": "HasInputUnitSymbol",
                                            "previewWikiTextTemplate": "{{result}}",
                                            "labelTemplate": "{{result}}",
                                            "watch": {
                                                "property": "parameter.nominal_quantity"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }]
            }
        },
        "staticText0030": {
            "type": "string", "format": "markdown", "options": { "hidden": true }, "default": `
<includeonly>
{{OslTemplate:LabProcess/Instance/Footer}}
</includeonly>
<noinclude>
{{OslTemplate:LabProcess/Footer}}
</noinclude>
`
        },
    }
}

var schema3 = {
    "title": "KB/Term",
    "type": "object",
    "id": "term",
    "properties": {
        "header": {
            "title": "General Data",
            "type": "object",
            "id": "header",
            "properties": {
                "_template": {
                    "type": "string",
                    "default": "OslTemplate:KB/Term",
                    "options": {
                        "hidden": true
                    }
                },
                "label": {
                    "title": "Label",
                    "type": "string",
                    "description": "Human readable name"
                },
                "label_lang_code" : {
                    "title": "Lang code",
                    "type": "string",
                    "enum": ["en","de"]
                }
            }
        },
        "freetext": {
            "type": "string", "format": "markdown", "options": { "hidden": true }, "default": "=Details=\n"
        },
        "footer": {
            "title": "Footer",
            "type": "object",
            "id": "footer",
            "properties": {
                "_template": {
                    "type": "string",
                    "default": "OslTemplate:KB/Term/Footer",
                    "options": {
                        "hidden": true,
                    }
                }
            },
            "options": {
                "hidden": true
            }
        }
    }
}

data1 = {
    "osl_template": "OslTemplate:KB/Entity",
    "label": "dffXX",
    "label_lang_code": "en",
    "extensions": [
      {
        "osl_template": "OslTemplate:LIMS/Device/EntityType",
        "manufacturer": "dfdf",
        "extensions": [],
        "osl_footer": {
          "osl_template": "OslTemplate:LIMS/Device/EntityType/Footer"
        }
      },
      {
        "osl_template": "OslTemplate:LIMS/Event",
        "start": "",
        "end": "",
        "extensions": [],
        "osl_footer": {
          "osl_template": "OslTemplate:LIMS/Event/Footer"
        }
      }
    ],
    "osl_wikitext": "\n=Details=\n",
    "osl_footer": {
      "osl_template": "OslTemplate:KB/Entity/Footer"
    }
  }

data2 = {
    "osl_template": "OslTemplate:KB/Entity",
    "label": "TestE",
    "label_lang_code": "en",
    "extensions": [
      {
        "osl_template": "OslTemplate:LIMS/Device/EntityType",
        "osl_footer": {
          "osl_template": "OslTemplate:LIMS/Device/EntityType/Footer"
        },
        "manufacturer": "TestM"
      },
      {
        "osl_template": "OslTemplate:LIMS/Event",
        "osl_footer": {
          "osl_template": "OslTemplate:LIMS/Event/Footer"
        },
        "start": "",
        "end": "",
        "extensions": []
      }
    ],
    "osl_wikitext": "\n=Details=\n",
    "osl_footer": {
        "extensions": [],
        "osl_template": "OslTemplate:KB/Entity/Footer"
      }
  }


$(document).ready(function () {

    $.when(
        mw.loader.using('ext.mwjson.util'),
        mw.loader.using('ext.mwjson.api'),
        mw.loader.using('ext.mwjson.parser'),
        mw.loader.using('ext.mwjson.editor'),
        $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    ).done(function () {
        if ($('.JsonEditor').length) mwjson.editor.init().done(() => {
            $(".JsonEditor").each(function (index) {
                var defaultOptions = {};
                var userOptions = {};

                if (this.dataset.config) userOptions = JSON.parse(this.dataset.config);
                else if (this.innerText !== "") userOptions = JSON.parse(this.innerText); //Legacy support
                var config = { ...defaultOptions, ...userOptions };
               var searchParams = new URLSearchParams(window.location.search);
                if ((searchParams.has('target') && !(searchParams.get('target') === ""))) config.target = searchParams.get('target');
                if ((searchParams.has('target_namespace') && !(searchParams.get('target_namespace') === ""))) config.target_namespace = searchParams.get('target_namespace');
                if ((searchParams.has('slot') && !(searchParams.get('slot') === ""))) config.target_slot = searchParams.get('slot');
                if ((searchParams.has('schema') && !(searchParams.get('schema') === ""))) config.schema = JSON.parse(searchParams.get('schema'));
                if ((searchParams.has('data') && !(searchParams.get('data') === ""))) config.data = mwjson.util.objectFromCompressedBase64(decodeURIComponent(searchParams.get('data')));
                if (!config.schema) config.schema = {"$ref": "/wiki/JsonSchema:KB/Entity?action=raw"}
                //config.target = "VisualTest:Extension/WSSlots/MultiSlotPage"
                //config.data = data2;
                config.container = this;
                var editor = new mwjson.editor(config);
            });
        });
    });
});
