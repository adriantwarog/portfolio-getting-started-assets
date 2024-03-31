import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { NextResponse } from 'next/server';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

export async function POST(req){
	
	const { messages } = await req.json();

	const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

	messages.unshift({
		role: 'system',
		content: `You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Adrian from his resume.`
	})

	const response = await client.getChatCompletions(model, messages, {
		maxTokens: 128,
	})

	return NextResponse.json({ 
		message: response.choices[0].message.content
	 })
}

const DATA_RESUME = `Adrian Twarog
Address: 1 Suburb, Street, State, 6000, Australia
Phone: +610000000
Email: not-real@adriantwarog.com
Education
Title of Course [2020-2021]
Name of Training 
Title of Academy
Microsoft Certified Web Professional  [2019 – 2018]
Graphics Designer and Web Administrator
Australian Example of Programming Business
High School Course [2018 – 2016]
Title of the Course or Majors 
Name of the High School
Skills and Competences
Full Stack Website Developer 
Front End:  HTML, CSS, JavaScript, SASS, SCSS, LESS, SEO React, Angular, Knockout, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3 
Back End:  NodeJS, PHP MySQL, MongoDB, SQL, noSQL Apache, Express, IIS, Webhooks 
Platforms: Amazon AWS, Linux, Windows, Cloud, Automation, Custom 
Frameworks: WordPress, Joomla, PrestaShop, Shopify, Stripe, PayPal, Github 
Management: Google Analytics, Adwords, Facebook Ads, Web Masters, etc 
Full Stack App Developer 
Platforms:  iOS Development, Android Development, OS Development 
Front End:  React Native, JavaScript 
Back End:  Integrated platforms, IE, Custom, WordPress, Drupal, etc 
UX and UI Designer 
Platforms:  Adobe Photoshop, Sketch, Figma 
UI:  Website Mock-ups, App Mock-ups, Infographics, Stylesheets, Logos 
UX:  Wireframing, Workflow Diagrams, Technical Specifications  
Employment History
Web Developer [Apr 2010 – Jul 2011] 
Moshi Moshi Marketing
 Did some web dev and also IT. Provide on-site and remote technical support to 100+ clients ranging from large corporate bodies to private home users. 
 Provide over the phone support for clients to address software, hardware and network issues and assist clients through using remote software.
 Troubleshooting and resolving level 2 and 3 technical problems.
 Conduct VMware ESX installation, configuration and management. 
 Conduct communications cabinet installation, including fibre optic and cat6 patching, UPS, wireless switches and servers.
 Conduct server installation and software deployment.
 Assist with large scale SOE machine deployment. 

Additional Skills and Interests
Language: Fluent in Polish
Hobbies: Badminton, Graphics Design, Snowboarding
Online: Youtube`

