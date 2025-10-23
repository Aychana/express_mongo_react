provider "aws" {
  region = "us-west-2"
}

resource "aws_security_group" "fil_rouge_sg" {
  name        = "fil-rouge-sg"
  description = "Allow SSH and HTTP"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "fil_rouge_ec2" {
  ami           = "ami-0e1d35993cb249cee" # Remplace par l’AMI Amazon Linux 2 trouvée en us-west-2
  instance_type = "t2.micro"              # Respecte la contrainte t2/t3 nano → medium
  vpc_security_group_ids = [aws_security_group.fil_rouge_sg.id]

  tags = {
    Name = "fil-rouge-ec2"
  }
}

output "ec2_public_ip" {
  value = aws_instance.fil_rouge_ec2.public_ip
}