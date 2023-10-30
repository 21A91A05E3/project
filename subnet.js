function nearest_power(n)
{
	res=1,i=0;
	while(res<n)
	{
		i+=1;
		res*=2;
	}
	return i;
}
function find()
{
	var ip=document.getElementById('vpc').value;
	var slash=parseInt(document.getElementById('subnetvalue').value);
	var req_ip=parseInt(document.getElementById('req').value);
	var arr=ip.split(".");
	var valid1=1;
	if(arr.length<4)
	{
		valid1=0;
	}
	if(valid1===0)
	{
		var answer=document.getElementById("answer");
			var subnettext=`INVALID INPUT ! <br>
			The IP address contains 4 octates.<br>But you have entered only ${arr.length} octates.<br>
			Please Enter a Valid Private IP address.<br>`;
			answer.innerHTML+=subnettext;

	}
	else
	{
		for(i=0;i<arr.length;i++)
		{
			if(parseInt(arr[i])>255)
			{
				valid1=0;
				break;
			}
		}
		if(valid1===0)
		{
			var answer=document.getElementById("answer");
			var subnettext=`INVALID INPUT ! <br>
			The IP address value range is from 0 to 255.<br>
			Please Enter a Valid Private IP address.<br>`;
			answer.innerHTML+=subnettext;
		}
		else if(valid1===1)
		{
			var valid=0,valid2=0;
			if(arr[0]==='10')
			{
				valid=1;
			}
			else if(arr[0]==='172')
			{
				if(parseInt(arr[1])>=16 && parseInt(arr[1])<=31)
				{
					valid=1;
				}
				else
				{
					valid=0;
				}
			}
			else if(arr[0]==='192')
			{
				if(arr[1]==='168')
				{
					valid=1;
				}
				else
				{
					valid=0;
				}
			}
			else if(arr[0]==='169' && arr[1]==='254')
			{
				valid2=0;

			}
			else 
			{
				valid=0;
			}
		}
	}
	if(valid2===0)
	{
		var answer=document.getElementById("answer");
		var subnettext=`INVALID INPUT ! <br><br>
		The IP address entered is APIPA which is a reserved IP .<br>
		APIPA stands for Automatic Private IP Addressing (APIPA). <br>
		It is a feature or characteristic in operating systems which enables computers to self-configure an 
		IP address and subnet mask automatically when their DHCP(Dynamic Host Configuration Protocol) server isn’t reachable. <br>
		The IP address range for APIPA is (169.254.0.1 to 169.254.255.254) having 65, 534 usable IP addresses, 
		with the subnet mask of 255.255.0.0.<br><br>
		Please Enter the Private IP address.<br>`;
		answer.innerHTML+=subnettext;

	}
	else if(valid===0)
	{
		var answer=document.getElementById("answer");
		var subnettext=`INVALID INPUT ! <br>
		The IP address entered is not a Private IP.<br>
		Please Enter the Private IP address.<br>`;
		answer.innerHTML+=subnettext;
	}
	else if(valid==1)
	{
		var answer1=document.getElementById("answer1");
		
		var hosts=nearest_power(req_ip+5);
		
		var new_slash=32-hosts
		var networks;
		
		networks=Math.pow(2,new_slash-slash);
		
		var total_ip=Math.pow(2,hosts);

		var ind=parseInt(slash/8);

		if(total_ip<256)
		{
			add_value=total_ip;
		}
	
		else 
		{
			add_value=parseInt(total_ip)/256;
		}

		var value=0;
		var i,last=255;
		subnettext=`Total no.of Subnets are : ${networks}<br> `;
		answer1.innerHTML+=subnettext;
		subnettext=`No.of ip's for each subnet = ${total_ip}<br>Note: But ${total_ip-5} ip's are available to use.<br><br>`;
		answer1.innerHTML+=subnettext;
		while(networks)
		{
			var s="";
			var r="";
			if(total_ip<256)
			{
				//add_value=total_ip;
				for(i=0;i<arr.length;i++)
				{
					if(value>=255)
					{
						var new_value = parseInt(arr[2]) + 1;
						arr[2]=new_value.toString();
						value=0;
					}
					if(i==3)
					{
						if(total_ip<256)
						{
							s+=value.toString();
							value+=add_value;
							var value1=value-1;
							r+=value1.toString();
						}
						else
						{
							s+=arr[i].toString();
							r+=arr[i].toString();
						}
					}
					else
					{
						s+=arr[i].toString();
						r+=arr[i].toString();
					}

					if(i!=arr.length-1)
					{
						s+=".";
						r+=".";
					}
				}
			}
			else
			{	
				for(i=0;i<arr.length;i++)
				{
					if(i===2)
					{
						s+=value.toString();
						value+=add_value;
						var value1=value-1;
						r+=value1.toString();

					}
					else
					{
						s+=arr[i].toString();
						if(i!=3)
						{
							r+=arr[i].toString();
						}
						else
						{
							r+=last;	
						}
					}
					if(i!=arr.length-1)
					{
						s+=".";
						r+=".";
					}
				}

			}

			s+="/";
			s+=new_slash.toString();
			r+="/";
			r+=new_slash.toString();
			subnettext=`${s} ---> ${r}<br><br>`;
			answer1.innerHTML+=subnettext;
			networks-=1;
		}
	}
}
function Resetfun()
{
    document.getElementById('vpc').value='';
    document.getElementById('subnetvalue').value='';
    document.getElementById('req').value='';
    document.getElementById('answer1').innerHTML='';
    document.getElementById('answer').innerHTML='';
}