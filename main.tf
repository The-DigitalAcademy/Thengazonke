variable "region" {
  default = "us-west-2"
}

variable "domain_name" {
  default = "mikeball.me"
}

provider "aws" {
  region = "${var.region}"
}

resource "aws_ecs_cluster" "example" {
  name = "example-cluster"
}

resource "aws_ecs_task_definition" "example" {
  family = "example-task"
  container_definitions = <<DEFINITION
[
  {
    "name": "node",
    "image": "my-node-app",
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ],
    "memory": 256
  },
  {
    "name": "angular",
    "image": "my-angular-app",
    "portMappings": [
      {
        "containerPort": 4200,
        "hostPort": 4200
      }
    ],
    "memory": 256
  }
]
DEFINITION
}

resource "aws_ecs_service" "example" {
  name            = "example-service"
  task_definition = aws_ecs_task_definition.example.arn
  cluster         = aws_ecs_cluster.example.arn
  desired_count   = 2
}

resource "aws_elb" "example" {
  name               = "example-elb"
  security_groups    = [aws_security_group.example.id]
  subnets            = [aws_subnet.example.id]
  listener {
    instance_port     = 3000
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }
}

resource "aws_security_group" "example" {
  name        = "example"
  description = "Example security group"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_subnet" "example" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}


## This configuration creates an Amazon Elastic Container Service (ECS) cluster and task definition, 
## an Elastic Load Balancer (ELB) and a security group, an Elastic Network Interface and a Virtual Private Cloud (VPC) that are
## required to run the containers. 
## It also maps the ports of the container to the host ports. 
## Once you've defined your resources in the main.tf file, 
## you can use the terraform apply command to create the resources on AWS.